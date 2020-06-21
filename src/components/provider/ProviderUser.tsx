import React, { Component, createContext } from "react";
import { fireauth, createUserDoc } from "../firebase";

export const UserContext = createContext({ user: null });

class ProviderUser extends Component {
  state = {
    user: null
  };

  componentDidMount = async () => {
    fireauth.onAuthStateChanged(async userAuth => {
      const user = await createUserDoc(userAuth);
      this.setState({ user });
    });
  };

  render() {
    const { user }: any = this.state;

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default ProviderUser;
