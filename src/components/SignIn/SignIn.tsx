import React from "react";
import css from "./SignIn.module.scss";

type SignInProps = {
  open: boolean;
  onClose: () => void;
};
export const SignIn = (props: SignInProps) => {
  if (props.open) {
    return (
      <div className={css.signin}>
        <div className={css.signin__formWrapper}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
            }}
          >
            <div>
              Username:
              <br />
              <input type="text" name="username" />
            </div>
            <div>
              Password:
              <br />
              <input type="password" name="userpassword" />
            </div>
            <button type="submit">Login</button>
            <button onClick={() => props.onClose()}>Cancel</button>
          </form>
        </div>
      </div>
    );

    return null;
  }
};
