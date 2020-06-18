import React, {useEffect} from "react";
import MapWrapper from "./components/wrapper/MapWrapper";

import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import { uuidv4 } from "./components/helper";

function App() {
  useEffect(() => {
    const value = localStorage.getItem("health--zapp");
    if (window.localStorage) {
      if (value === null) {
        localStorage.setItem("health--zapp", uuidv4());
      }
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="w-100 mt-3 text-light">Find nearest health centers</h1>
      </header>
      <div className="container h-100">
        <MapWrapper />
      </div>
    </div>
  );
}

export default App;
