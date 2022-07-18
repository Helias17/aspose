import React, { useState } from "react";
import { AuthData } from "../../types/type";
import css from "./SignIn.module.scss";

type SignInProps = {
  open: boolean;
  onClose: () => void;
  error: string;
  submit: (data: AuthData) => Promise<void>;
};

export const SignIn = (props: SignInProps) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  if (props.open) {
    return (
      <div className={css.signin}>
        <div className={css.signin__formWrapper}>
          <p>
            <b>Sign in:</b>
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              props.submit({ email: login, password });
            }}
          >
            <div>
              Username:
              <br />
              <input
                type="text"
                name="username"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div>
              Password:
              <br />
              <input
                type="password"
                name="userpassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
            <button onClick={() => props.onClose()}>Cancel</button>
          </form>
          {props.error ? (
            <p className={css.signin__err}>{props.error}</p>
          ) : null}
        </div>
      </div>
    );
  }

  return null;
};
