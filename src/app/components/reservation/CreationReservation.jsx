import { makeStyles, Container, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { InsyInputText } from "../../shared/components/form-and-error-components/InputCustom";
import { parseDateToZoneDate } from "../../views/AgendaView";
import apiBackEnd from "../../api/backend/api.Backend";
import GuestsList from "./GuestsList.jsx";
import { useState } from "react";
import Loader from "../../shared/components/utils-components/Loader";
import { useEffect } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { format } from "date-fns";
import moment from "moment";
import "moment/locale/fr";
import SearchBarUsers from "./SearchBarUsers";
import { defaultValuesCreateBooking } from "../../shared/constants/formik-yup/default-values-form/idefaultValuesBooking";
import { schemaFormCreateBooking } from "./../../shared/constants/formik-yup/yup/yupBooking";

const FORMAT_HOUR = "dd-MM-yyyy Ã  HH:mm";
const TIMEZONE = "Europe/Berlin";

export function parseHour(date) {
  if (!date) return null;
  return format(new Date(date), FORMAT_HOUR, { TIMEZONE });
}

const useStyle = makeStyles((theme) => ({
  container: {
    width: "50vw",
    height: "80vh",
    backgroundColor: "white",
    position: "absolute",
    top: 30,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      width: "60vw",
      height: "60vh",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
      height: "60vh",
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
  },
  title: {
    border: "solid 5px #0B84FF",
    color: "white",
    backgroundColor: "#0B84FF",
    fontSize: "26px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      border: "solid 3px #0B84FF",
      color: "white",
      backgroundColor: "#0B84FF",
      fontSize: "20px",
      textAlign: "center",
    },
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2em",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  btnSending: {
    boxShadow: "1px 1px 1px  grey",
    marginRight: "2em",
    border: "2px solid",
    borderColor: "#0b84ff",
    marginBottom: "2em",
    "&:hover": {
      backgroundColor: "#fbfbfb",
      color: "#0b84ff",
      borderColor: "#0b84ff",
    },
  },
  btnCancel: {
    boxShadow: "1px 1px 1px  grey",
    marginRight: "2em",
    border: "2px solid",
    borderColor: "#D91714",
    marginBottom: "2em",
    "&:hover": {
      backgroundColor: "#fbfbfb",
      color: "#D91714",
      borderColor: "#D91714",
    },
  },
}));

export function parseDateHour(date) {
  if (!date) return null;
  return format(new Date(date), FORMAT_HOUR, { TIMEZONE });
}

function CreateReservation() {
  const [users, setUsers] = useState([]);
  const [guests, setGuests] = useState([]);
  const [value, setValue] = useState(new Date());
  const [value1, setValue1] = useState(new Date());
  const classes = useStyle();

  useEffect(() => {
    apiBackEnd.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  function handleAddInvite(valuee) {
    if (guests.some((elem) => elem === valuee)) {
      console.log("Already exists MOFO");
    } else {
      setGuests([...guests, valuee]);
    }
  }
  const listId = [];
  const updateBooking = (values) => {
    guests.map((guest) => listId.push(guest.id));

    parseDateHour(values.startAt);
    console.log(values);
    values.startAt = moment(value1, "YYYY-MM-DD HH:mm").toDate();
    values.finishAt = moment(value, "YYYY-MM-DD HH:mm").toDate();

    const manageBookingVM = {
      bookingDTO: {
        title: values.title,
        description: values.description,
        startAt: values.startAt,
        finishAt: values.finishAt,
        roomId: 1,
      },
      userHostId: JSON.parse(localStorage.getItem("actualUser")).id,
      usersGuestIds: listId,
    };
    console.log(manageBookingVM);
    apiBackEnd
      .post("/bookings", manageBookingVM, {
        headers: { "Content-Type": "application/json" },
      })
      .then((resp) => {
        resp.status === 200
          ? alert(
              resp.data.title +
                " est deja réservée pour les horaires de " +
                parseHour(resp.data.startAt) +
                " à " +
                parseHour(resp.data.finishAt)
            )
          : alert("Votre réservation est bien validée");
      });
  };
  return (
    <>
      <Container className={classes.container}>
        <div className={classes.title}>Création de la réservation</div>
        <Formik
          onSubmit={(values) => {
            updateBooking(values);
          }}
          initialValues={defaultValuesCreateBooking}
        >
          {({ values }) => (
            <Form className={classes.form}>
              <div className={classes.item}>
                <label>Titre de la réunion</label>
                <Field
                  name="title"
                  type="input"
                  fullWidth
                  as={TextField}
                  value={values.title}
                  component={InsyInputText}
                  errorRight
                />
              </div>
              <div className={classes.item}>
                <SearchBarUsers users={users} setList={handleAddInvite} />
              </div>
              <div className={classes.item}>
                <label>Participants</label>
                <GuestsList guests={guests} />
              </div>
              <div className={classes.item}>
                <label>Description</label>
                <Field
                  name="description"
                  type="input"
                  multiline
                  rows={4}
                  value={values.description}
                  fullWidth
                  as={TextField}
                  component={InsyInputText}
                  errorRight
                />
              </div>
              <div className={classes.item}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    ampm={false}
                    inputFormat="dd/MM/yyyy HH:mm"
                    renderInput={(props) => <TextField {...props} />}
                    label="Début de la réunion"
                    value={value1}
                    onChange={(newValue1) => {
                      setValue1(newValue1);
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    ampm={false}
                    inputFormat="dd/MM/yyyy HH:mm"
                    label="Fin de la réunion"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className={classes.btnGroup}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.btnSending}
                >
                  Valider
                </Button>
                <Button
                  variant="contained"
                  color="Secondary"
                  className={classes.btnCancel}
                >
                  Annuler
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}
export default CreateReservation;
