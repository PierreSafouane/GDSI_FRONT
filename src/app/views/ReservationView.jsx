import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import CreateReservation from "../components/reservation/CreationReservation.jsx";
import apiBackEnd from "../api/backend/api.Backend.js";

const ReservationView = ({ users }) => {
  return (
    <Container className="mt-5">
      <CreateReservation users={users} />
    </Container>
  );
};

export default ReservationView;
