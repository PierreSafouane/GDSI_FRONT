import React, { useEffect, useState } from "react";
import { Button, Card, Container, makeStyles } from "@material-ui/core";
import apiBackEnd from "./../api/backend/api.Backend";
import GeneralStats from "../components/statsAdmin/GeneralStats";
import RoomStats from "./../components/statsAdmin/RoomStats";

const useStyles = makeStyles((theme) => ({
  roomGroupe: {
    backgroundColor: "red",
  },
}));

const StatsAdminView = () => {
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);
  const [specRooms, setSpecRooms] = useState("");

  const loadRoom = (i) => {
    setSpecRooms(i);
  };

  useEffect(() => {
    apiBackEnd.get("/rooms").then((res) => {
      setRooms(res.data);
    });
  }, []);

  return (
    <Card>
      <div>
        <h2>Statistique de l'application</h2>
      </div>
      <div className={classes.contRoom}>
        <Container className={classes.roomGroupe}>
          {rooms.map((room, index) => {
            return (
              <Button
                className={
                  room === specRooms ? classes.roomActive : classes.room
                }
                key={index}
                onClick={() => {
                  loadRoom(room);
                }}
              >
                {room.name}
              </Button>
            );
          })}
          <Button
            className={classes.room}
            onClick={() => {
              loadRoom("");
            }}
          >
            Générales
          </Button>
        </Container>
        <hr />
        <GeneralStats />
        <RoomStats />
      </div>
    </Card>
  );
};
export default StatsAdminView;
