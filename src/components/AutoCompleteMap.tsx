import React, {useState} from 'react'
import { AutoComplete } from 'antd';

interface Location{
    suggestions: any[],
        dataSource: any[],
        lagosLatLng: any
        autoCompleteService: any,
        geoCoderService: any,
}


function AutoCompleteMap(props: any){

    const init: Location = {
        suggestions: [],
        dataSource: [],
        lagosLatLng: props.lagosLatLng,
        autoCompleteService: props.autoCompleteService,
        geoCoderService: props.geoCoderService,
      }
  
    const [state, setState] = useState(()=>init)

    function onSelect(value: any){
        state.geoCoderService.geocode({ address: value }, ((response: any) => {
          const { location } = response[0].geometry;
          props.addMarker(location.lat(), location.lng(), props.markerName, value);
        }))
      } 

      function handleSearch(value: string){
        const { autoCompleteService, lagosLatLng } = state;
 
        if (value.length > 0) {
          const searchQuery = {
            input: value,
            location: lagosLatLng, 
            radius: 40000,
          };
          autoCompleteService.getQueryPredictions(searchQuery, ((response: any[]) => {
            
            if (response) {
              const dataSource = response.map((resp) => resp.description);
              setState({...state, dataSource, suggestions: response });
            }
          }));
        }
      }

      const { dataSource } = state;

    return (
        <AutoComplete
          className="w-100"
          dataSource={dataSource}
          onSelect={onSelect}
          onSearch={handleSearch}
          placeholder="Address"
        />
      );
}

export default AutoCompleteMap