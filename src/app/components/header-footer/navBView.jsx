import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import {
  URL_AGENDA,
  URL_HOME,
  URL_MATERIAL,
  URL_USERVIEW,
  URL_LOGIN,
  URL_ADMINVIEW,
  URL_RESERVATIONVIEW,
} from "../../shared/constants/urls/urlConstants";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOut } from "../../shared/redux-store/actions/authenticationActions";
import { Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import apiBackEnd from "../../api/backend/api.Backend.js";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: "90px",
  },
  profilePic: {
    width: "35px",
    height: "35px",
    fontSize: "small",
  },
  imageProfil: {
    height: "32px",
    width: "32px",
  },
  logo: {
    height: "44px",
    width: "202px",
  },
  logoTextless: {
    display: "flex",
    flexDirection: "column",
    height: "2.75em",
    width: "100px",
    marginLeft: "10px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  resa: {
    height: "2.75em",
    width: "100px",
    marginLeft: "10px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  menuLi: {
    width: "150px",
    color: "#0B84FF",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Poppins, Medium",
    fontSize: "12px",
    textTransform: "uppercase",
  },
  grow: {
    flexGrow: 1,
  },
  navIcons: {
    marginLeft: "50px",
  },
  marginLeft: {
    marginLeft: "5px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "35px",
    },
  },
  appbar: {
    backgroundColor: "white",
    color: "black",
  },
  menuButton: {
    marginRight: theme.spacing(6),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  iconRoot: {
    textAlign: "center",
    display: "block",
  },
  imageIcone: {
    display: "flex",
    height: "inherit",
    width: "inherit",
    outline: "none",
  },

  eventNoteIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  span: {
    fontFamily: "Poppins, Medium",
    textTransform: "uppercase",
    fontSize: "12px ",
    marginLeft: "0px",
    color: "#0B84FF",
    [theme.breakpoints.up("md")]: {
      marginLeft: "0px",
      fontSize: "20px",
      fontFamily: "Poppins, Medium",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  sectionCenterMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },
  sectionDisapearMobile: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function PrimarySearchAppBar() {
  // Toutes les constantes
  const dispatch = useDispatch();
  const isLogged = useSelector(
    ({ authenticationReducer: { isLogged } }) => isLogged
  );
  const history = useHistory();
  const handleSignOut = () => {
    dispatch(signOut());
    history.push(URL_HOME);
    handleMenuClose();
  };
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        className={classes.menuLi}
        onClick={handleMenuClose}
        style={{ textDecoration: "none" }}
      >
        <Link to={URL_USERVIEW} style={{ textDecoration: "none" }}>
          <PersonIcon className="accountIcon" />
          <span>Profil</span>
        </Link>
      </MenuItem>
      <Link to={URL_LOGIN} style={{ textDecoration: "none" }}>
        <MenuItem
          className={classes.menuLi}
          onClick={handleSignOut}
          style={{ textDecoration: "none" }}
        >
          Deconnexion
        </MenuItem>
      </Link>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem className={classes.menuLi}>
        <Link to={URL_AGENDA} style={{ textDecoration: "none" }}>
          <DateRangeIcon />
          <span className={classes.span}>Agenda</span>
        </Link>
      </MenuItem>
      <MenuItem className={classes.menuLi}>
        <Link
          className={classes.marginLeft}
          to={URL_MATERIAL}
          style={{ textDecoration: "none" }}
        >
          <AllInboxIcon />
          <span className={classes.span}>Matériel</span>
        </Link>
      </MenuItem>

      {isLogged &&
        localStorage.getItem("actualUser") !== null &&
        JSON.parse(localStorage.getItem("actualUser")).authorities.length >
          1 && (
          <MenuItem className={classes.menuLi}>
            <Link
              to={URL_ADMINVIEW}
              className={classes.marginLeft}
              style={{ textDecoration: "none" }}
            >
              <SupervisorAccountIcon style={{ color: "#0B84FF" }} />
              <span className={classes.span}>Panel Admin</span>
            </Link>
          </MenuItem>
        )}
    </Menu>
  );
  const [user, setActualUser] = useState();
  useEffect(() => {
    if (isLogged) {
      apiBackEnd.get("/account").then((res) => {
        localStorage.setItem("actualUser", JSON.stringify(res.data));
        setActualUser(res.data);
      });
    }
  }, [isLogged]);
  return (
    <Box className={classes.grow}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Link to={URL_HOME}>
            <img
              className={classes.logoTextless}
              alt="logo"
              src="/images/logoTextless.png"
            />
          </Link>

          <div className={classes.sectionDisapearMobile}>
            <Link className="home" to={URL_HOME}>
              <img className={classes.logo} alt="logo" src="/images/logo.png" />
            </Link>

            <div className={classes.navIcons}>
              <Link
                className={classes.marginLeft}
                to={URL_AGENDA}
                style={{ textDecoration: "none" }}
              >
                <DateRangeIcon />
                <span className={classes.span}>Agenda</span>
              </Link>
              <Link
                className={classes.marginLeft}
                to={URL_MATERIAL}
                style={{ textDecoration: "none" }}
              >
                <AllInboxIcon />
                <span className={classes.span}>Materiel</span>
              </Link>

              {isLogged &&
                localStorage.getItem("actualUser") !== null &&
                JSON.parse(localStorage.getItem("actualUser")).authorities
                  .length > 1 && (
                  <Link
                    className={classes.marginLeft}
                    to={URL_ADMINVIEW}
                    style={{ textDecoration: "none" }}
                  >
                    <SupervisorAccountIcon className="accountIcon" />
                    <span className={classes.span}>Panel Admin</span>
                  </Link>
                )}
            </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}></div>
          {isLogged && localStorage.getItem("actualUser") !== null && (
            <div>
              <div className={classes.sectionCenterMobile}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="primary"
                >
                  <div className={classes.profilePic}>
                    <img
                      src={
                        JSON.parse(localStorage.getItem("actualUser")).imageUrl
                      }
                      className={classes.imageProfil}
                      alt="Profile "
                    />
                  </div>
                </IconButton>
                <div className={classes.menuLi}>
                  <span color="primary">
                    {" "}
                    {JSON.parse(localStorage.getItem("actualUser")).lastName}
                  </span>
                  <span color="primary">
                    {JSON.parse(localStorage.getItem("actualUser")).authorities
                      .length > 1
                      ? "Admin"
                      : "User"}
                  </span>
                </div>
              </div>
              <Link to={URL_LOGIN} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
