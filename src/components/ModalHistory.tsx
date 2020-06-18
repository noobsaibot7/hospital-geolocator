import React, { useState, useEffect } from "react";
import firebase from "./firebase";

import { Modal, Button } from "antd";

function useStore(val: any) {
  const [store, setStore] = useState([]);

  useEffect(() => {
  

    const storage: any = localStorage.getItem("health--zapp");
   
    if (storage) {
        const cloud = firebase.firestore().collection(storage);
        cloud
          .orderBy("searchType.name")
          .onSnapshot(snapshot => {
            const newTimes: any = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setStore(newTimes);
          });

    }
  }, [val]);
  return store;
}

function ModalHistory(props: any) {
  const [state, setState] = useState({ visible: false });
  const [address, setAddress] = useState({});
  const stores = useStore(state);

  useEffect(() => {
    props.makeSearch();
  }, [address]);

  const showModal = () => {
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
          {stores &&
            stores.map((store: any) => (
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
            ))}
        </ol>
      </Modal>
    </div>
  );
}

export default ModalHistory;

