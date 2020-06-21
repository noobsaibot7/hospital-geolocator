import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import MapWrapper from "./components/wrapper/MapWrapper";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ResetPassword from "./components/ResetPassword";
import { UserContext } from "./components/provider/ProviderUser";

import { fireauth } from "./components/firebase";



function App() {
  let user: any = useContext(UserContext);

  useEffect(()=>{

  }, [user])

  function handleLogOut() {
    fireauth.signOut();
   
  }


  return (
    <div className="App">
      <header className="App-header container-fluid">
        <div className="container">
          <h4 className="mt-1 text-light float-left">
            Find nearest health centers
          </h4>
          {user && (
            <p className="float-right h6 text-muted mt-1">
              Hi, {user.displayName}{" "}
              <button
                className="btn btn-outline-info btn-sm"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </p>
          )}
        </div>
      </header>
      <div className="container h-100">
        <Router>
          {user ? (
            <Route>
              <MapWrapper />
            </Route>
          ) : (
            <Switch>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/reset">
                <ResetPassword />
              </Route>
              <Route path="/">
                <SignIn />
              </Route>
            </Switch>
          )}
        </Router>
      </div>
    </div>
  );
}

export default App;
