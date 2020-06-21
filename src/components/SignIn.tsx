import React, { useState } from "react";
import { Link} from "react-router-dom";
import { fireauth, signInWithGoogle } from "./firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>(null);

  const signInWithEmailAndPasswordHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, email: string, password: string) => {
    e.preventDefault();
    fireauth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Error signing in with password and email!");
      
    });
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
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
        <h5 className="text-center">Sign in</h5>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="email"
            name="userEmail"
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
            name="userPassword"
            value={password}
            onChange={e => onChangeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            onClick={e => {
              signInWithEmailAndPasswordHandler(e, email, password);
            }}
            className="btn btn-primary btn-block"
          >
            Sign in
          </button>
        </div>
        <hr />
        <div className="form-group">
          <button
            onClick={() => {
              signInWithGoogle()
              
            }}
            className="btn btn-danger btn-block"
          >
            Sign in with Google
          </button>
        </div>
        <div className="clearfix">
          <Link to="/reset" className="pull-right">
            Forgot Password?
          </Link>
        </div>
      </form>
      <p className="text-center">
        <Link to="/signup">Create an Account</Link>
      </p>
    </div>
  );
}

export default SignIn;
