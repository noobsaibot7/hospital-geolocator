import React, { useContext } from "react";
import { UserContext } from "./provider/ProviderUser";
import { fireauth } from "./firebase";
import { useHistory } from "react-router-dom";


function Profile() {
  const user = useContext(UserContext);
  const { photoURL, displayName, email }: any = user;
  let history = useHistory();

  function getOut() {
    fireauth.signOut();
    history.push("/");
  }
  
  return (
    <div>
      <h1>Profile Page</h1>
      <div className="thumbnail">
        <img className="img-thumbnail" src={photoURL} alt="" />
      </div>

      <ul>
        <li>{email}</li>
        <li>{displayName}</li>
      </ul>
      <button className="btn btn-danger" onClick={getOut}>
        get out of here
      </button>
    </div>
  );
}

export default Profile;
