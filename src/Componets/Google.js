import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google user logged in: ", user);
    } catch (err) {
      console.error(err.message);
    }
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleLogin;
