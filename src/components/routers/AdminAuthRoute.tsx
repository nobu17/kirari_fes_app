import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

export default function AdminAuthRoute({ component: Component, ...rest }: any) {
  const { state } = useAdminAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return state.isAuthrized ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin_login" />
        );
      }}
    ></Route>
  );

}