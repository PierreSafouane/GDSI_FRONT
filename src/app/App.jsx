import React, { useState } from "react";
import { Provider } from "react-redux";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import RoutesWithNavigation from "./routes/RoutesWithNavigation";
import configureStore from "./shared/redux-store/store";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0B84FF",
    },
    secondary: {
      main: "#D91714",
    },
  },
  typography: {
    fontFamily: "Poppins, Medium",
  },
});

//store redux
const store = configureStore();

/**
 * Component APP
 * with:
 * 	- creation of redux store
 * 	- ToastContainer to display toast
 *
 * @author Peter Mollet
 */
const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        ...
      </LocalizationProvider>
      <Provider store={store}>
        <RoutesWithNavigation />
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
