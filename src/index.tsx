import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./index.css";
import App from "./App";
import ProviderUser from "./components/provider/ProviderUser";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "https://us-central1-my-workers.cloudfunctions.net/api"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ProviderUser>
      <App />
    </ProviderUser>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
