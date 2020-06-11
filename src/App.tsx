import React from "react";
import MapWrapper from "./components/wrapper/MapWrapper";

import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <header className="App-header"><h1 className="w-100 mt-3 text-light">Find nearest hospitals</h1></header>
      <div className="container h-100">
        <MapWrapper />
      </div>
    </div>
  );
}

export default App;
