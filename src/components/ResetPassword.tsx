import React, {useState} from "react";
import { Link } from "react-router-dom";
import {fireauth} from './firebase'

function Resetpassword() {
    const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState<any>(null);

  const onChangeHandler = (e: { currentTarget: { name: any; value: any; }; }) => {
    const { name, value } = e.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fireauth
      .sendPasswordResetEmail(email)
      .then(() => {
          setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };
  return (
    <div className="login-form">
      {
        emailHasBeenSent && (<div className="alert alert-primary" role="alert">
        An email has been sent to you!
        </div>)
      }
      {
        error !== null && (<div className="alert alert-danger" role="alert">
        {error}
        </div>)
      }
      <form>
        <h3 className="text-center text-info">Welcome to healthfinder</h3>
        <h5 className="text-center">Reset password</h5>
        <div className="form-group">
          <input
            type="email"
            name="userEmail"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="form-group">
          <button
            onClick={e => {
              sendResetEmail(e);
            }}
            className="btn btn-primary btn-block"
          >
            Send me a reset link
          </button>
        </div>
      </form>
      <p className="text-center">
        Back to <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
}

export default Resetpassword;
