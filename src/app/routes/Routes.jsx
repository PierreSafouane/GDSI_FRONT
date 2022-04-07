import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  URL_HOME,
  URL_LOGIN,
  URL_ADMIN_HOME,
  URL_SENDINGPAGE,
  URL_USERVIEW,
  URL_ADMINVIEW,
  URL_MODIFICATIONRESERVATIONVIEW,
  URL_AGENDA,
  URL_USERBOOKINGHISTORY,
  URL_RESERVATIONVIEW,
  URL_SEARCHUSERSVIEW,
  URL_ATTENDINGVIEW,
  URL_ADMIN_STATS,
  URL_ACTIVATION_ACCOUNT,
} from "../shared/constants/urls/urlConstants";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import { customHistory } from "../shared/services/historyServices";
import AdminHomeView from "../views/AdminHomeView";
import { ROLE_ADMIN } from "../shared/constants/rolesConstant";
import { PrivateRoute } from "../shared/components/utils-components/PrivateRoute";
import SendingResetPsw from "../components/account/SendingPageResetPsw";
import { URL_RESETPASSWORD } from "./../shared/constants/urls/urlConstants";
import ResetPasswordView from "./../views/ResetPasswordView";
import UserView from "../views/UserView";
import PanelAdminView from "../views/PanelAdminView";
import UpdateReservation from "./../components/reservation/UpdateReservation";
import ResponseMailAttending from "./../views/ResponseMailAttending";

import AgendaView from "../views/AgendaView";
import UserBoookingHistoryView from "./../views/UserBookingHistoryView";
import ReservationView from "../views/ReservationView";
import SearchUsers from "./../components/reservation/SearchUsers";
import StatsAdminView from "../views/StatsAdminView";
import ActivationView from "../views/ActivationView";

/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {
  return (
    <Switch history={customHistory}>
      <PrivateRoute exact path={URL_HOME} component={HomeView} />
      <PrivateRoute
        path={URL_ADMIN_HOME}
        component={AdminHomeView}
        roles={[ROLE_ADMIN]}
      />
      <PrivateRoute
        path={URL_ADMIN_STATS}
        component={StatsAdminView}
        roles={[ROLE_ADMIN]}
      />
      <Route path={URL_LOGIN} component={LoginView} />
      <Route path={URL_RESETPASSWORD} component={ResetPasswordView} />
      <Route path={URL_ACTIVATION_ACCOUNT} component={ActivationView} />
      <Route path={URL_SENDINGPAGE} component={SendingResetPsw} />
      <Route path={URL_USERVIEW} component={UserView} />
      <Route path={URL_ADMINVIEW} component={PanelAdminView} />
      <Route
        path={URL_MODIFICATIONRESERVATIONVIEW}
        component={UpdateReservation}
      />
      <PrivateRoute path={URL_AGENDA} component={AgendaView} />
      <PrivateRoute
        path={URL_USERBOOKINGHISTORY}
        component={UserBoookingHistoryView}
      />
      <Route
        path={URL_MODIFICATIONRESERVATIONVIEW}
        component={UpdateReservation}
      />
      <Route path={URL_RESERVATIONVIEW} component={ReservationView} />
      <Route path={URL_SEARCHUSERSVIEW} component={SearchUsers} />

      <Route path={URL_ATTENDINGVIEW} component={ResponseMailAttending} />
    </Switch>
  );
};

export default Routes;
