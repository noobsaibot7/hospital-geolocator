import React, { useState, useCallback, useContext } from "react";
import GoogleMapReact from "google-map-react";

import { Button, Divider, message } from "antd";

import AutoCompleteMap from "../AutoCompleteMap";
import Marker from "../Marker";
import Card from "../Card";
import Slider from "../Slider";
import SelectHealth from "../SelectHealth";
import ModalHistory from "../ModalHistory";
import { firestore } from "../firebase";
import mapStyles from "../../mapStyles";

import { UserContext } from "../provider/ProviderUser";

const LG_COOR = { lat: 6.465422, lng: 3.406448 };

interface Strap {
  key: any;
  libraries: any[];
}

interface SearchTerm {
  radius: any;
  searchType: any;
  markers: any;
}

interface Address {
  constraints: any;
  searchType: any;
  radius: any;
  searchResults: any[];
  mapsLoaded: boolean;
  markers: any[];
  map: any;
  mapsApi: any;
  lagosLatLng: any;
  autoCompleteService: any;
  placesService: any;
  geoCoderService: any;
  directionService: any;
}

const mapKeys: Strap = {
  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "directions"]
};

function MapWrapper() {
  const initialState: Address = {
    constraints: { name: "" },
    searchType: { name: "clinic" },
    radius: { value: 1 },
    searchResults: [],
    mapsLoaded: false,
    markers: [],
    map: {},
    mapsApi: {},
    lagosLatLng: {},
    autoCompleteService: {},
    placesService: {},
    geoCoderService: {},
    directionService: {}
  };
  const [state, setState] = useState(() => initialState);

  function updateSearchType(name: string) {
    setState({ ...state, searchType: { name } });
  }

  function updateRadius(value: number) {
    setState({ ...state, radius: { value } });
  }

  function updateFromHistory({ radius, searchType, markers }: SearchTerm) {
    setState({ ...state, radius, searchType, markers: [...markers] });
  }
  const storageContext: any = useContext(UserContext);

  const saveToConsole = useCallback(
    (markers: any, radius: any, searchType: any) => {
      const store = firestore.collection(storageContext.uid);

      let data: any[] = [];
      store.get().then(querySnap => {
        if (querySnap.empty) {
          store.add({
            markers,
            searchType,
            radius
          });
        }

        querySnap.forEach(doc => {
          data.push(doc.data());
        });
        const found = data.find(
          location =>
            markers[0].value === location.markers[0].value &&
            radius.value === location.radius.value &&
            searchType.name === location.searchType.name
        );

        if (!found && !querySnap.empty) {
          store.add({
            markers,
            searchType,
            radius
          });
        }
      });
    },
    []
  );

  function addMarker(lat: number, lng: number, name: string, value: string) {
    const markers: any[] = [...state.markers];

    let newMarker = true;
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].name === name) {
        newMarker = false;
        markers[i].lat = lat;
        markers[i].lng = lng;
        markers[i].value = value;
        message.success(`Updated location Marker`);
        break;
      }
    }

    if (newMarker) {
      markers.push({ lat, lng, name, value });
      message.success(`Added new location Marker`);
    }

    setState({ ...state, markers: [...markers] });
  }

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
  };

  function apiHasLoaded(map: any, mapsApi: any) {
    setState({
      ...state,
      mapsLoaded: true,
      map,
      mapsApi,
      lagosLatLng: new mapsApi.LatLng(LG_COOR.lat, LG_COOR.lng),
      autoCompleteService: new mapsApi.places.AutocompleteService(),
      placesService: new mapsApi.places.PlacesService(map),
      geoCoderService: new mapsApi.Geocoder(),
      directionService: new mapsApi.DirectionsService()
    });
  }

  function handleSearch() {
    const {
      markers,
      placesService,
      directionService,
      mapsApi,
      radius,
      searchType
    } = state;
    if (markers.length === 0) {
      return message.warn("Add an address!");
    }
    const filteredResults: any[] = [];
    const marker = markers[0];
    const markerLatLng = new mapsApi.LatLng(marker.lat, marker.lng);
    const radiusVal = radius.value * 1000;
    const types =
      searchType.name === "pharmacy" ? ["pharmacy", "drugstore"] : ["hospital"];
    saveToConsole(markers, radius, searchType);

    const placesRequest = {
      location: markerLatLng,
      radius: radiusVal,
      types: types,
      query: searchType.name,
      rankBy: mapsApi.places.RankBy.DISTANCE
    };

    placesService.textSearch(placesRequest, (response: any[]) => {
      for (let i = 0; i < response.length; i++) {
        const hospitalPlace = response[i];
        const { rating, name } = hospitalPlace;
        const address = hospitalPlace.formatted_address;
        let photoUrl = "";
        let openNow = false;
        if (hospitalPlace.opening_hours) {
          openNow = hospitalPlace.opening_hours.isOpen();
        }
        if (hospitalPlace.photos && hospitalPlace.photos.length > 0) {
          photoUrl = hospitalPlace.photos[0].getUrl();
        }

        const directionRequest = {
          origin: markerLatLng,
          destination: address,
          travelMode: "DRIVING"
        };
        directionService.route(
          directionRequest,
          (result: any, status: string) => {
            if (status !== "OK") {
              return;
            }

            const travellingRoute = result.routes[0].legs[0];
            const travellingTimeInMinutes = travellingRoute.duration.value / 60;

            const distanceText = travellingRoute.distance.text;
            const timeText = travellingRoute.duration.text;
            filteredResults.push({
              name,
              rating,
              address,
              openNow,
              photoUrl,
              distanceText,
              timeText,
              travellingTimeInMinutes
            });
            const sortedResult = filteredResults.sort(
              (loc1, loc2) =>
                loc1.travellingTimeInMinutes - loc2.travellingTimeInMinutes
            );

            setState({ ...state, searchResults: sortedResult });

            state.map.panTo(markerLatLng);
            state.map.setZoom(14);
          }
        );
      }
    });
  }

  const {
    constraints,
    mapsLoaded,
    lagosLatLng,
    markers,
    searchResults,
    radius,
    autoCompleteService,
    geoCoderService,
    searchType
  } = state;

  return (
    <div className="w-100 d-flex py-4 flex-wrap justify-content-center">
      <section className="search">
        {mapsLoaded ? (
          <div className="mb-1">
            <div className="d-flex flex-wrap">
              <AutoCompleteMap
                autoCompleteService={autoCompleteService}
                geoCoderService={geoCoderService}
                lagosLatLng={lagosLatLng}
                markerName={constraints.name}
                addMarker={addMarker}
              />
            </div>
            <SelectHealth
              value={searchType.name}
              onChangeType={updateSearchType}
            />
            <Slider
              iconType="compass"
              value={radius.value}
              onChange={value => updateRadius(value)}
              text="Radius: 1 to 50KM"
            />

            <Button
              className="mt-3 fw-md"
              type="primary"
              size="large"
              onClick={handleSearch}
            >
              Search!
            </Button>

            {searchResults.length > 0 && (
              <p className="text-primary mt-4">scroll down for results</p>
            )}
          </div>
        ) : null}
      </section>

      <section className="col-12 h-lg">
        <GoogleMapReact
          bootstrapURLKeys={mapKeys}
          options={options}
          defaultZoom={15}
          defaultCenter={{ lat: LG_COOR.lat, lng: LG_COOR.lng }}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        >
          {markers.map((marker, key) => {
            const { name, lat, lng } = marker;
            return <Marker key={key} name={name} lat={lat} lng={lng} />;
          })}
        </GoogleMapReact>
      </section>
      {
        <ModalHistory
          updateLocation={updateFromHistory}
          makeSearch={handleSearch}
          marker={markers}
        />
      }

      {searchResults.length > 0 ? (
        <>
          <Divider />
          <section className="col-12">
            <div className="d-flex flex-column justify-content-center">
              <h4 className="mb-4 fw-md">
                {searchResults.length} options are closest to you by car
              </h4>
              <div className="d-flex flex-wrap">
                {searchResults.map((result, index) => (
                  <Card info={result} key={index} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

export default MapWrapper;
