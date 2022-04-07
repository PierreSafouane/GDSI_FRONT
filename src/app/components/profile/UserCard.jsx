import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Card } from '@material-ui/core';
import Loader from './../../shared/components/utils-components/Loader';
import { makeStyles } from '@material-ui/core/styles';
import ModificationProfil from './ModificationProfil';
import ModificationPassword from './ModificationPassword';
import TableauReuunion from './TableauReunion';

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}


export default function UserCard({account, setAccount}) {

  console.log("usercard : ", account);

  const useStyles = makeStyles({
    MuiAppBarColorPrimary: {
      backgroundColor: "transparent !important",
      color: "black !important",
      borderBottomColor: "white  !important",
    },
    PrivateTabIndicatorColorSecondary5: {
      backgroundColor: "white !important",
  },
    MuiTabsIndicator: {
      backgroundColor: "#0B84FF !important",
  },
    linkTab :{
      minWidth: "50% !important "
  },
    MuiTabWrapper:{
      "&.active": {
         color: "#0B84FF !important",
    }
  },
    profilePic: {
        width:"200px",
        height:"200px",
        marginTop: "2vh",
        marginLeft: "2vw",
  },
    userInputDisp  : {
      marginTop: "25px",
      marginBottom: "20px",
      fontSize: "1.5em",
      ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
        fontSize: "1em",
      }
  },
    modifyPass:{
      marginLeft: "2vw",
      marginBottom:"15vh",
      fontSize: "large",
  },
    userData:{
      marginLeft: "2vw",
  },
    vhCenterUser:{
      marginTop: "10vh",
      position: "absolute",
      top:"10%",
      height: "100px",
      left: "50%",
      MsTransform: "translate(-50%, -50%)",
      transform: "translate(-50%, -50%)",
      width: "80%",
  },
    wrenchIcon:{
      left: "85%",
      bottom:" 20px",
  },
    MuiPaperElevation4:{
      width: "100% !important",
  },
    tabPanel:{
      width: "150%",
  },
    MuiPaperRounded:{
      height: "60vh",
      ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
        height: "80vh",
      }
  },
    header:{
      minWidth: "100% !important "
    },



})
  const classes = useStyles();
  const [value, setValue] = React.useState(0);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  if(!account) return <Loader />


  return (

    
    <div className={classes.vhCenterUser} >
        <Card>
       
          <AppBar  position="static" >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab className={classes.linkTab} label="Mon Profil" href="/drafts" {...a11yProps(0)} />
              
              <LinkTab className={classes.linkTab} label="Mes Réunions" href="/trash" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} id="user-card-tab-panel-1">
              <div>
              <img className={classes.profilePic} 
                src={account.imageUrl} alt="Profile" />
              
                <ModificationPassword/>
            
        </div>
        <br/>
        <div className={classes.userData}>
            <div className={classes.userInputDisp}>Nom : {account.lastName}</div>
            <div className={classes.userInputDisp}>Prénom : {account.firstName}</div>
            <div className={classes.userInputDisp}>Adresse Mail : {account.email}</div>
        </div>
        <ModificationProfil account={account}  setAccount={setAccount}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TableauReuunion account={account}/>
      </TabPanel>
      </Card>
    </div>
  );
  
}
