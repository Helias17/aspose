import React, { useState } from "react";
import { SignIn } from "../SignIn/SignIn";

export const Auth = () => {
  const [signInVisible, setSignInVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const handleSignInClose = () => {
    setSignInVisible(false);
  };

  return (
    <div>
      <a href="#" className="link-dark" onClick={() => setSignInVisible(true)}>
        Sign in
      </a>{" "}
      |{" "}
      <a href="#" className="link-dark">
        Sign up
      </a>
      <SignIn open={signInVisible} onClose={handleSignInClose} />
    </div>
  );
};
