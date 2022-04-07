import { Button, Card, makeStyles } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import { InsyInputText } from "../../shared/components/form-and-error-components/InputCustom";
import { useHistory } from "react-router-dom";
import { URL_HOME } from "./../../shared/constants/urls/urlConstants";
import apiBackEnd from "../../api/backend/api.Backend";
import { schemaFormSendingResetPsw } from "../../shared/constants/formik-yup/yup/yupUser";

const useStyles = makeStyles((theme) => ({
  vhCenter: {
    marginTop: "15em",
    display: "flex",
    justifyContent: "center",

    [theme.breakpoints.down("md")]: {
      marginTop: "10em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "15em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "5em",
    },
  },
  titleLg: {
    display: "block",
    color: "white",
    backgroundColor: "#0B84FF",
    fontSize: "1.5em",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: "3em",
    },
  },
  cardWindow: {
    boxShadow: "5px 5px 5px  grey",
  },
  formikInput: {
    marginTop: "2em",
    marginLeft: "1em",
    marginRight: "1em",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2em",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  btnSending: {
    boxShadow: "1px 1px 1px  grey",
    marginTop: "2em",
    border: "2px solid",
    borderColor: "#0b84ff",
    "&:hover": {
      backgroundColor: "#fbfbfb",
      color: "#0b84ff",
    },
  },
  btnCancel: {
    marginTop: "2em",
    border: "2px solid",
    borderColor: "#D91714",
    "&:hover": {
      boxShadow: "1px 1px 1px  grey",
      backgroundColor: "#fbfbfb",
      color: "#D91714",
      borderColor: "#D91714",
    },
  },
}));

const SendingPageResetPsw = (submit) => {
  const sendMailReset = (mail) => {
    apiBackEnd.post("/account/reset-password/init", mail.mail, {
      headers: { "Content-Type": "application/json" },
    });

    alert("Mail envoyé");
  };

  let history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.vhCenter}>
      <Card className={classes.cardWindow}>
        <div className={classes.titleLg}>Entrer votre email</div>
        <div className={classes.formikInput}>
          <Formik
            initialValues={{ mail: "" }}
            onSubmit={(mail) => {
              sendMailReset(mail);
            }}
            validationSchema={schemaFormSendingResetPsw}
          >
            {({ values }) => (
              <Form>
                <Field
                  name="mail"
                  value={values.mail}
                  type="input"
                  fullWidth
                  errorRight
                  className="mt-4"
                  placeholder="Votre mail"
                  component={InsyInputText}
                />
                <br />
                <br />
                <span>
                  Vous recevrez un liens par mail pour reinitialiser votre mot
                  de passe
                </span>
                <div className={classes.btnGroup}>
                  <Button
                    className={classes.btnSending}
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Envoi
                  </Button>
                  <Button
                    className={classes.btnCancel}
                    size="large"
                    onClick={() => history.push(URL_HOME)}
                    variant="contained"
                    color="secondary"
                  >
                    Annuler
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </div>
  );
};
export default SendingPageResetPsw;
