import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./../api/backend/account";
import Login from "../components/account/Login";
import { isAuthenticated } from "../shared/services/accountServices";
import { URL_HOME } from "./../shared/constants/urls/urlConstants";
import { signIn } from "../shared/redux-store/actions/authenticationActions";
import { Box } from "@material-ui/core/";

/**
 * View/Page Login
 *
 * @param {object} history
 * @author Peter Mollet
 */
const LoginView = ({ history }) => {
  const [errorLog, setErrorLog] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = (values) => {
    authenticate(values)
      .then((res) => {
        if (res.status === 200 && res.data.id_token) {
          dispatch(signIn(res.data.id_token));
          if (isAuthenticated) history.push(URL_HOME);
        }
      })
      .catch(() => setErrorLog(true));
  };

  return (
    <Box display="flex" justifyContent="center" className="mt-5">
      <Login submit={handleLogin} errorLog={errorLog} />
    </Box>
  );
};

export default LoginView;
