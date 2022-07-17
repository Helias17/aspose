import React, { useState } from "react";
import { SignIn } from "../SignIn/SignIn";
import { SignUp } from "../SignUp/SignUp";

export const Auth = () => {
  const [signInVisible, setSignInVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const handleSignInClose = () => {
    setSignInVisible(false);
  };
  const handleSignUpClose = () => {
    setSignUpVisible(false);
  };

  return (
    <div>
      <a href="#" className="link-dark" onClick={() => setSignInVisible(true)}>
        Sign in
      </a>{" "}
      |{" "}
      <a href="#" className="link-dark" onClick={() => setSignUpVisible(true)}>
        Sign up
      </a>
      <SignIn open={signInVisible} onClose={handleSignInClose} />
      <SignUp open={signUpVisible} onClose={handleSignUpClose} />
    </div>
  );
};
