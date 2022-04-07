import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Card, makeStyles } from "@material-ui/core";
import { defaulValuesLogin } from "./../../shared/constants/formik-yup/default-values-form/idefaultValuesUser";
import { schemaFormLogin } from "./../../shared/constants/formik-yup/yup/yupUser";
import ErrorMessSmall from "./../../shared/components/form-and-error-components/ErrorMessSmall";
import { InsyInputText } from "../../shared/components/form-and-error-components/InputCustom";
import { Link } from "react-router-dom";
import { URL_SENDINGPAGE } from "../../shared/constants/urls/urlConstants";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
/**
 * Component Form Login
 * Use Formik to create the Form
 *
 * @param {function} submit: submit Function
 * @param {object} initialValues: the initial values of the form
 * @param {boolean} errorLog: to display or not the message of login/mdp not valid
 * @param {object} validationSchema: validation's schema of the form
 * @author Peter Mollet
 */

const useStyles = makeStyles((theme) => ({
  vhCenter: {
    marginTop: "10em",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    width: "30em",
    [theme.breakpoints.down("md")]: {
      width: "30em",
      marginTop: "5em",
      marginLeft: "10em",
      marginRight: "10em",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30em",
      marginTop: "5em",
      marginLeft: "0em",
      marginRight: "0em",
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
  checkbox: { color: "#696969" },
  cardWindow: { boxShadow: "5px 5px 5px  grey" },
  loginUtils: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1em",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  btnSending: {
    boxShadow: "1px 1px 1px  grey",
    border: "2px solid",
    borderColor: "#0b84ff",
    "&:hover": {
      backgroundColor: "#fbfbfb",
      color: "#0b84ff",
      borderColor: "#0b84ff",
    },
  },
}));

const FormLogin = ({ submit, errorLog }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={defaulValuesLogin}
      onSubmit={submit}
      validationSchema={schemaFormLogin}
    >
      <Form>
        <Field
          type="text"
          name="username"
          placeholder="Login"
          component={InsyInputText}
          fullWidth
          errorRight
        />
        <Field
          type="password"
          name="password"
          placeholder="Password"
          component={InsyInputText}
          fullWidth
          errorRight
          className="mt-4"
        />

        <div className={classes.loginUtils}>
          <div className={classes.checkbox}>
            <Field
              type="checkbox"
              className={classes.checkbox}
              name="rememberMe"
              color="primary"
            />
            Remember me
          </div>
          <Link to={URL_SENDINGPAGE}>
            <p className="passwForgotten">Mot de passe oublié?</p>
          </Link>
        </div>
        <hr />
        <Button
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          className={classes.btnSending}
        >
          Connexion
        </Button>
        {errorLog && (
          <ErrorMessSmall middle message="Login/Password incorrect(s)" />
        )}
      </Form>
    </Formik>
  );
};

/**
 * Component Login
 *
 * will need in props:
 *  - Submit Function
 *  - initialValues
 *  - errorLog boolean
 *  - validationSchema
 *
 * See above for information
 *
 * @author Peter Mollet
 */
const Login = (props) => {
  console.log("Login : " + props);
  const classes = useStyles();
  return (
    <div className={classes.vhCenter}>
      <Card className={classes.cardWindow}>
        <div className={classes.titleLg}>Login</div>
        <hr />
        <div className="p-3">
          <FormLogin {...props} />
        </div>
      </Card>
    </div>
  );
};

export default Login;
