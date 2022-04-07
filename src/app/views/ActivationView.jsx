import React from "react";
import { useLocation } from "react-router";
import apiBackEnd from "../api/backend/api.Backend";

const ActivationView = () => {
  const location = new URLSearchParams(useLocation().search);

  const ActivateAccount = () => {
    const resetKey = location.get("key");
    const keyActivate = { key: resetKey };
    apiBackEnd.get("/activate", keyActivate.key);
  };

  return <div>Votre compte vient d'être activé</div>;
};
export default ActivationView;
