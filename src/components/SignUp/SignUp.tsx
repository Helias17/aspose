import React, { useState } from "react";
import { AuthData } from "../../types/type";
import css from "./SignUp.module.scss";

type SignUpProps = {
  open: boolean;
  onClose: () => void;
  submit: (data: AuthData) => Promise<void>;
  success: boolean;
};

type FormDataType = {
  email: string;
  password: string;
  password2: string;
};

export const SignUp = (props: SignUpProps) => {
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = (event.target.id || event.target.name) as keyof FormData;
    const newFormData = { ...formData, [id]: event.target.value };
    setFormData(newFormData);
  };

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
              props.submit({
                email: formData.email,
                password: formData.password,
              });
            }}
          >
            <div>
              E-mail:
              <br />
              <input
                type="e-mail"
                required
                name="username"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              Password:
              <br />
              <input
                type="password"
                required
                name="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div>
              Repeat password:
              <br />
              <input
                type="password"
                required
                name="password2"
                id="password2"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Register</button>
            <button onClick={() => props.onClose()}>Cancel</button>
          </form>
          {props.success && (
            <p className={css.signup__success}>
              Registration completed successfully!
            </p>
          )}
        </div>
      </div>
    );

    return null;
  }
};
