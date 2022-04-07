import React from "react";
import { Button, Card, makeStyles } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { InsyInputText } from "../shared/components/form-and-error-components/InputCustom";
import apiBackEnd from "./../api/backend/api.Backend";
import { useLocation } from "react-router";
import { passwordConfirm } from "../shared/constants/formik-yup/default-values-form/idefaultValuesUser";
import { schemaFormConfirmPsw } from "../shared/constants/formik-yup/yup/yupUser";
import { Warning } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  cardWindow: { boxShadow: "5px 5px 5px  grey" },
  vhCenter: {
    marginTop: "15em",
    display: "flex",
    justifyContent: "center",
  },
  titleLg: {
    padding: "0.2em",
    display: "block",
    color: "white",
    backgroundColor: "#0B84FF",
    fontSize: "1.5em",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: "3em",
    },
  },
  formikInput: {
    marginTop: "2em",
    marginLeft: "1em",
    marginRight: "1em",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  btnSending: {
    boxShadow: "1px 1px 1px  grey",
    marginTop: "2em",
    border: "2px solid",
    borderColor: "#0b84ff",
    marginBottom: "2em",
    "&:hover": {
      backgroundColor: "#fbfbfb",
      color: "#0b84ff",
      borderColor: "#0b84ff",
    },
  },
}));

const ResetPasswordView = () => {
  const classes = useStyles();
  const location = new URLSearchParams(useLocation().search);

  const resetPasword = (newPassword) => {
    const resetKey = location.get("key");
    const keyPassword = { key: resetKey, newPassword: newPassword.newPassword };

    apiBackEnd.post("/account/reset-password/finish", keyPassword);
    Warning("Changement effectué");
  };

  return (
    <div className={classes.vhCenter}>
      <Card className={classes.cardWindow}>
        <div className={classes.titleLg}>Nouveau mot de passe</div>
        <div className={classes.formikInput}>
          <Formik
            initialValues={passwordConfirm}
            onSubmit={(newPassword) => {
              resetPasword(newPassword);
            }}
            validationSchema={schemaFormConfirmPsw}
          >
            {({ values }) => (
              <Form>
                <Field
                  type="password"
                  name="newPassword"
                  value={values.newPassword}
                  placeholder="Nouveau mot de passe"
                  component={InsyInputText}
                  fullWidth
                  errorRight
                />
                <br />
                <br />
                <Field
                  type="password"
                  name="confNewPassword"
                  value={values.confNewPassword}
                  placeholder="Confirmer mot de passe"
                  component={InsyInputText}
                  fullWidth
                  errorRight
                />

                <div>
                  <Button
                    className={classes.btnSending}
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Envoi
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

export default ResetPasswordView;
