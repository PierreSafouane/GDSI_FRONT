import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBView from "./../components/header-footer/navBView";
import Routes from "./Routes";
import IdleTimerCustom from "../components/account/IdleTimerCustom";
import { useSelector } from "react-redux";

/**
 * Component RouteWithNavigation
 * To create the structure of the application (nav bar, routes, toast, etc...)
 *
 * @author Peter Mollet
 */
const RoutesWithNavigation = () => {
  const isLogged = useSelector(
    ({ authenticationReducer: { isLogged } }) => isLogged
  );

  return (
    <BrowserRouter>
      {isLogged && <IdleTimerCustom />}
      <NavBView />
      <main>
        <Routes />
      </main>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
};

export default RoutesWithNavigation;
