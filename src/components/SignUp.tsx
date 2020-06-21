import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { fireauth, signInWithGoogle, createUserDoc } from "./firebase";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<any>(null);

  const createUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    try {
      const { user } = await fireauth.createUserWithEmailAndPassword(
        email,
        password
      );
      createUserDoc(user, { displayName });
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="login-form">
      {error !== null && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form>
        <h3 className="text-center text-info">Welcome to healthfinder</h3>
        <h5 className="text-center">Sign Up</h5>
        <div className="form-group">
          <input
            type="text"
            name="displayName"
            className="form-control"
            placeholder="e.g lawani"
            id="displayName"
            onChange={e => onChangeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="userEmail"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={e => onChangeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            name="userPassword"
            onChange={e => onChangeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <button
            onClick={e => {
              createUser(e, email, password);
            }}
            className="btn btn-primary btn-block"
          >
            Sign up
          </button>
        </div>
        <hr />
        <div className="form-group">
          <button
            onClick={() => {
              try {
                signInWithGoogle();
              } catch (error) {
               
              }
            }}
            type="submit"
            className="btn btn-danger btn-block"
          >
            Sign up with Google
          </button>
        </div>
      </form>
      <p className="text-center">
        Have an account?<Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
}

export default SignUp;
