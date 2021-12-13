import React from "react";
import { useHistory } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { useEffect } from "react";

export default function AdminLogout() {
  const history = useHistory();
  const { logout } = useAdminAuth();

  useEffect(() => {
    const f = async () => {
      await logout();
      history.push("/");
    };
    f();
  });

  return <></>;
}
