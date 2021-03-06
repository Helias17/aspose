import React, { useState } from "react";
import { userApi } from "../../api/api";
import { AuthData } from "../../types/type";
import { SignIn } from "../SignIn/SignIn";
import { SignUp } from "../SignUp/SignUp";
import css from "./Auth.module.scss";

const authorisedUserStorage = localStorage.getItem("xsdrz-user");
const authorisedUser = authorisedUserStorage || "";

export const Auth = () => {
  const [signInVisible, setSignInVisible] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState("");
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [successSignUp, setSuccessSignUp] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [username, setUsername] = useState(authorisedUser);

  const handleSignInClose = () => {
    setSignInVisible(false);
    setErrorSignIn("");
  };
  const handleSignUpClose = () => {
    setSignUpVisible(false);
    setSuccessSignUp(false);
  };

  const handleSignInSubmit = async (data: AuthData) => {
    try {
      const response = await userApi.signIn(data);
      if (!response.data.length) {
        throw new Error("User not found...");
      }
      setUsername(response.data[0].email);
      localStorage.setItem("xsdrz-user", response.data[0].email);
      handleSignInClose();
    } catch (err) {
      setErrorSignIn(err.message);
      setTimeout(() => setErrorSignIn(""), 3000);
    }
  };

  const handleSignUpSubmit = async (data: AuthData) => {
    try {
      const response = await userApi.signUp(data);
      setSuccessSignUp(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    setUsername(null);
    localStorage.setItem("xsdrz-user", "");
  };

  if (username) {
    return (
      <div className={css.auth}>
        <div
          className={css.auth__avatar}
          onMouseOver={() => setHintVisible(true)}
          onMouseOut={() => setHintVisible(false)}
        >
          {username.charAt(0).toUpperCase()}
          {hintVisible ? <p className={css.auth__hint}>{username}</p> : ""}
        </div>
        <a href="#" className="link-dark" onClick={handleLogout}>
          Logout
        </a>
      </div>
    );
  }

  return (
    <div>
      <a href="#" className="link-dark" onClick={() => setSignInVisible(true)}>
        Sign in
      </a>{" "}
      |{" "}
      <a href="#" className="link-dark" onClick={() => setSignUpVisible(true)}>
        Sign up
      </a>
      <SignIn
        open={signInVisible}
        onClose={handleSignInClose}
        submit={handleSignInSubmit}
        error={errorSignIn}
      />
      <SignUp
        open={signUpVisible}
        onClose={handleSignUpClose}
        submit={handleSignUpSubmit}
        //error={errorSignIn}
        success={successSignUp}
      />
    </div>
  );
};
