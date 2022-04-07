import React, { useEffect, useState } from "react";
import apiBackEnd from "../../api/backend/api.Backend";
import SearchBarUsers from "../reservation/SearchBarUsers";

const Home = () => {
  const [actualUser, setActualUser] = useState();
  useEffect(() => {
    apiBackEnd.get("/account").then((res) => {
      setActualUser(res.data);
    });
  }, []);
  console.log(actualUser);
  return (
    <>                   
      <h1>HOME</h1>
    </>
  );
};

export default Home;