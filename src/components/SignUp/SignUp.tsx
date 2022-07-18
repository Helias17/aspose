import React from "react";
import { userApi } from "../../api/api";
import css from "./SignUp.module.scss";

type SignUpProps = {
  open: boolean;
  onClose: () => void;
};
export const SignUp = (props: SignUpProps) => {
  if (props.open) {
    return (
      <div className={css.signup}>
        <div className={css.signup__formWrapper}>
          <p>
            <b>Registration:</b>
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await userApi.signUp({
                username: "Irishka",
                password: "123456",
              });
              console.log(response);
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
            <div>
              Repeat password:
              <br />
              <input type="password" name="userpassword" />
            </div>
            <button type="submit">Register</button>
            <button onClick={() => props.onClose()}>Cancel</button>
          </form>
        </div>
      </div>
    );

    return null;
  }
};
