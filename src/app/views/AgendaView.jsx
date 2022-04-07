import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Container from "@material-ui/core/Container";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, makeStyles } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "moment/locale/fr";
import apiBackEnd from "../api/backend/api.Backend";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import {
  URL_MODIFICATIONRESERVATIONVIEW,
  URL_RESERVATIONVIEW,
} from "./../shared/constants/urls/urlConstants";

const FORMAT_HOUR = "dd-MM-yyyy HH:mm";
const TIMEZONE = "Europe/Berlin";

export function parseDateToZoneDate(date) {
  if (!date) return null;
  const zonedDate = utcToZonedTime(date, TIMEZONE);
  return format(zonedDate, FORMAT_HOUR, { TIMEZONE });
}

export function parseDate(date) {
  if (!date) return null;
  return format(new Date(date), FORMAT_HOUR, { TIMEZONE });
}
const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
  test: {
    backgroundColor: "#0B84FF",
    color: "white",
    fontSize: "1.2em",
    paddingBottom: "0.5em",
  },
  buttonAjout: {
    position: "relative",
    top: "8em",
    left: "5em",
    paddingTop: "0.3em",
    paddingBottom: "0.3em",
    paddingLeft: "0.4em",
    paddingRight: "0.4em",
    border: "0.01em solid",
    backgroundColor: "#0B84FF",
    boxShadow: "1.5px 1.5px 1.5px 1.5px #a9a9a9",
    color: "white",
    width: "10em",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#fbfbfb",
      color: "#0b84ff",
      borderColor: "#0b84ff",
    },
    "&:active": {
      backgroundColor: "#EE740F",
      color: "black",
      borderColor: "black",
    },
  },
  roomGroupe: {
    marginTop: "5em",
    display: "flex",
    justifyContent: "center",
  },
  room: {
    marginTop: "0.1em",
    marginBottom: "0.1em",
    paddingTop: "0.3em",
    paddingBottom: "0.3em",
    paddingLeft: "0.4em",
    paddingRight: "0.4em",
    border: "0.01em solid",
    backgroundColor: "#0B84FF",
    boxShadow: "1.5px 1.5px 1.5px 1.5px #a9a9a9",
    color: "white",
    width: "6em",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#fbfbfb",
      color: "#0b84ff",
      borderColor: "#0b84ff",
    },
    "&:active": {
      backgroundColor: "#EE740F",
      color: "black",
      borderColor: "black",
    },
  },
  roomActive: {
    marginTop: "0.1em",
    marginBottom: "0.1em",
    paddingTop: "0.3em",
    paddingBottom: "0.3em",
    paddingLeft: "0.4em",
    paddingRight: "0.4em",
    border: "0.01em solid",
    backgroundColor: "#EE740F",
    boxShadow: "1.5px 1.5px 1.5px 1.5px #a9a9a9",
    color: "white",
    width: "6em",
    textAlign: "center",
  },
}));

//On change la couleur selons l'id de la salle. grace a un if
const eventPropGetter = (events) => {
  if (events.roomId === 1) {
    const style = {
      backgroundColor: "#cc0c0c",
      paddingLeft: "10px",
      color: "white",
    };
    return {
      style: style,
    };
  }
  if (events.roomId === 2) {
    const style = {
      backgroundColor: "#06bd0d",
      paddingLeft: "10px",
      color: "white",
    };
    return {
      style: style,
    };
  }
  if (events.roomId === 3) {
    const style = {
      backgroundColor: "#a913dd",
      paddingLeft: "10px",
      color: "white",
    };
    return {
      style: style,
    };
  }
  if (events.roomId === 4) {
    const style = {
      backgroundColor: "#4471c9",
      paddingLeft: "10px",
      color: "white",
    };
    return {
      style: style,
    };
  }
  const style = {
    backgroundColor: "#4471c9",
    paddingLeft: "10px",
    color: "white",
  };
  return {
    style: style,
    render() {
      <div>
        <Button>Voir</Button>
      </div>;
    },
  };
};

const AgendaView = () => {
  const classes = useStyles();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [specRooms, setSpecRooms] = useState("");
  useEffect(() => {
    apiBackEnd.get("/rooms").then((res) => {
      setRooms(res.data);
    });
  }, []);
  //Getting bookings
  useEffect(() => {
    apiBackEnd.get("/bookings").then((res) => {
      const bookingCh = res.data;
      const events = [];
      bookingCh.forEach((obj) => {
        events.push({
          startAt: moment(obj.startAt, "YYYY-MM-DD HH:mm").toDate(),
          finishAt: moment(obj.finishAt, "YYYY-MM-DD HH:mm").toDate(),
          title: obj.title,
          roomId: obj.roomId,
          description: obj.description,
          id: obj.id,
        });
      });

      return setFilteredEvents(events);
    });
  }, []);

  //permet de faire des changements sur la vue du calendar
  let MyCustomHeader = ({ label }) => (
    <div>
      <div className={classes.test}>{label}</div>
    </div>
  );

  const loadRoom = (i) => {
    setSpecRooms(i);
  };

  //Envoi les infos des events depuis OnselectEvents dans Calendar
  let history = useHistory();
  const eventSelected = (event) => {
    history.push(URL_MODIFICATIONRESERVATIONVIEW);
    localStorage.setItem("selectedBooking", JSON.stringify(event));
  };

  const today = new Date();
  return (
    <div>
      <div>
        <div>
          <Link to={URL_RESERVATIONVIEW}>
            <Button className={classes.buttonAjout}>Aj. Réservation</Button>
          </Link>
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
              All
            </Button>
          </Container>
        </div>
      </div>
      <Calendar
        onSelectEvent={(event) => {
          eventSelected(event);
        }}
        min={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7)
        }
        max={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19)
        }
        views={["month", "day", "week"]}
        components={{
          day: { header: MyCustomHeader },
          week: { header: MyCustomHeader },
          month: { header: MyCustomHeader },
        }}
        View={{ agenda: false }}
        eventPropGetter={eventPropGetter}
        localizer={localizer}
        events={filteredEvents.filter((e) =>
          !specRooms.id ? e.roomId : e.roomId === specRooms.id
        )}
        startAccessor="startAt"
        endAccessor="finishAt"
        defaultView="week"
        style={{ height: 500, margin: "50px" }}
        messages={{
          allDay: "Toute la journée",
          month: "Mois",
          day: "Jour",
          today: "Auj.",
          previous: "Retour",
          next: "Prochain",
          date: "Date",
          time: "Temps",
          tomorrow: "Demain",
          week: "Semaine",
          work_week: "Semaine de travail",
          yesterday: "Hier",
        }}
      />
    </div>
  );
};
export default AgendaView;
