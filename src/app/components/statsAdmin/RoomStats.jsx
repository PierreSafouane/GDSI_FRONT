import { Card, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiBackEnd from "../../api/backend/api.Backend";

const RoomStats = () => {
  const [roomLastThirty, setRoomLastThirty] = useState("");
  const [roomLastSeven, setRoomLastSeven] = useState("");
  const [averageYear, setRoomAverageYear] = useState("");

  useEffect(() => {
    apiBackEnd.get("/findAverageBookingsCurrentYear/" + 1).then((res) => {
      setRoomAverageYear(res.data);
    });
  }, []);
  console.log(averageYear);
  return (
    <Card>
      <Container>
        <div>Nombre de réservation le dernier mois pour la room : </div>
        <div>{roomLastThirty.length}</div>
        <hr />
        <div>Nombre de réservation la dernière semaine : </div>
        <div>{roomLastSeven.length}</div>
        <hr />
        <div>La personne avec le plus de reservations pour la Room</div>
        <div>{roomLastThirty.length}</div>
        <hr />
        <div>Nombre de réservation en moyenne par jour sur l'année: </div>
        <div>{averageYear.length}</div>
        <hr />
        <div>Nombre d'heures de réservation en moyenne par mois : </div>
        <hr />
        <div>L'utilisateur qui a le plus de réservation de la salle : </div>
        <hr />
        <div>L'utilisateur qui a le plus de réservation de la salle : </div>
        <hr />
      </Container>
    </Card>
  );
};
export default RoomStats;
