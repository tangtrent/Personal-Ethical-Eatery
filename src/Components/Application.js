import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignIn/SignUp";
import ProfilePage from "./SignIn/ProfilePage";
import PasswordReset from "./SignIn/PasswordReset";

function Application() {
  const user = null;
  return (
        user ?
        <ProfilePage />
      :
        <Router>
        <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>
  );
}
export default Application;