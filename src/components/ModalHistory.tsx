import React, { useState, useEffect, useContext } from "react";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { firestore } from "./firebase";

import { Modal, Button } from "antd";
import { UserContext } from "./provider/ProviderUser";

const GET_HISTORY = gql`
  query getHistory($userId: String!) {
    historyResult(uid: $userId) {
      markers {
        lat
        lng
        name
        value
      }
      id
      radius {
        value
      }
      searchType {
        name
      }
    }
  }
`;

function ModalHistory(props: any) {
  const [state, setState] = useState({ visible: false });
  const [address, setAddress] = useState({});

  // const store: any = useStore(state);
  const storageContext: any = useContext(UserContext);
  const { loading, error, data, refetch } = useQuery(GET_HISTORY, {
    variables: { userId: storageContext.uid }
  });


  useEffect(() => {
    props.makeSearch();
    refetch()
  }, [address]);

  const showModal = () => {
    refetch()
    setState({
      visible: true
    });
  };

  const handleOk = (e: any) => {
    setState({
      visible: false
    });
  };

  const handleCancel = () => {
    refetch()
    setState({
      visible: false
    });
  };

  const getLocation = (store: React.SetStateAction<{}>) => {
    props.updateLocation(store);
    setAddress(store);
    handleCancel();
  };

  return (
    <div>
      <Button type="primary" className="mt-2" onClick={showModal}>
        Location History
      </Button>
      <Modal
        title="Location History"
        visible={state.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ol>
          {
            loading && <li>Loading, Please wait a little while</li>
          }
          {
            error && <li>Error, please check back later</li>
          }
        {data ? data.historyResult.map((store: any) => (
            <li
              key={store.id}
              className="text-primary mt-1"
              onClick={() => getLocation(store)}
            >
              <a>
                {store.markers[0].value} at {store.radius.value}KM for a{" "}
                {store.searchType.name}
              </a>
            </li>
          )): ''}
        </ol>
      </Modal>
    </div>
  );
}

export default ModalHistory;

