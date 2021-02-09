import React from "react";
import { Redirect, Route } from "react-router-dom";

const Privateroute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        localStorage.getItem("userInfo") ? (
          <Component {...props}></Component>
        ) : (
          <Redirect path="/Login" />
        );
      }}
    ></Route>
  );
};

export default privateRoute;
