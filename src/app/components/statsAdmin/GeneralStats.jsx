import { Card, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiBackEnd from "./../../api/backend/api.Backend";

const GeneralStats = () => {
  const [countUsers, setCounts] = useState("");
  useEffect(() => {
    apiBackEnd.get("/users").then((res) => {
      setCounts(res.data);
    });
  }, []);
  const [lastUser, setLastUser] = useState("");
  useEffect(() => {
    apiBackEnd.get("/users/lastCreated").then((res) => {
      setLastUser(res.data);
    });
  }, []);

  return (
    <Card>
      <Container>
        <div>Nombre d'utilisateurs : </div>
        <div>{countUsers.length}</div>
        <hr />
        <div>Dernier user créé : </div>
        <div>{lastUser.login}</div>
        <hr />
        <div>La room la plus réservé : </div>
      </Container>
    </Card>
  );
};
export default GeneralStats;
