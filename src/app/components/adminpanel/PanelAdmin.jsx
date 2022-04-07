import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { TableContainer, Table, TableHead ,TableRow,TableBody, Paper , TableCell, Container, Radio, RadioGroup,Button, Input} from '@material-ui/core';
import { Tooltip, Fab } from '@material-ui/core';
import { Delete} from "@material-ui/icons";
import apiBackEnd from '../../api/backend/api.Backend';
import Loader from './../../shared/components/utils-components/Loader';
import { Field, Form, Formik } from "formik";
import { InsyInputText } from '../../shared/components/form-and-error-components/InputCustom';
import { defaultValuesCreateUser } from '../../shared/constants/formik-yup/default-values-form/idefaultValuesUser';
import { schemaFormUpdateUser } from './../../shared/constants/formik-yup/yup/yupUser';
import ModificationProfilAdmin from './ModificationProfilAdmin';


function TabPanel(props) {
  const { children, value, index } = props;
   
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      
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


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: "absolute",
    top:"13%",
    width:"80%",
    right:"10vw",
    height:"110vh",
  },
  linkTab :{
    minWidth: "33.33% !important ",
},


  fab : {
      margin:"15px",
  },
  TextField:{
      marginLeft:"25px",
  },
  container:{
    width:700,
    height:400,
    backgroundColor:"white",
    position:"absolute",
    top:0,
    bottom:0,
    left:30,
    margin:"auto",
    [theme.breakpoints.down("sm")]:{
        width:"100vw",
        height:"100hw",
    }, 
},
profilePic: {
  width:"200px",
  height:"200px",
  marginTop: "-25vh",
  marginLeft: "40vw",
},
form:{
  padding:theme.spacing(2),
},
item:{
  marginBottom:theme.spacing(5),
  width:"20vw"
},
upload:{
  marginTop:"5vh",
  marginRight:"5vw",
  right:"7.5vw",
},
radio:{
  marginLeft:"5vw",
  marginBottom:"-20vh",
},
bouton:{
  marginTop:"25vh",
},
formulaire:{
  marginTop:"15vh",
  marginLeft:"5vw",
},
uploadPic:{
  marginTop:"-10vh",
},
rbuton:{
  marginTop:"-20vh",
},
table:{
  height : "95%",
},
update:{
  marginRight:"-15vw",
  width:"250px"
}


}));

export default function PanelAdmin() {


  const [isFiltering, setFiltering]=useState(false);
  const [filtered, setFiltered] = useState();
  const [allUsers, setAllUsers] = useState();
    useEffect(() => {
      apiBackEnd.get("/users").then((res) => {
        
        setAllUsers(res.data);
      });
    }, []);

    const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const createUser = (values) => {
    
  console.log(values)
  apiBackEnd.post("/users", values, {
    headers: { "Content-Type": "application/json" },
  }); 
};
const filteredList = () =>{
  return isFiltering ? filtered : allUsers;
}
const filtre = (input) => {
  let fullList = allUsers.flat();
  let results = fullList.filter((item) => {
    const name = item.firstName.toLowerCase();
    const term = input.toLowerCase();
    return name.indexOf(term) > -1;
  });
  setFiltered(results);
  
};
  if(!allUsers) return <Loader />
    

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab className={classes.linkTab} label="Liste Utilisateurs"  />
          <Tab className={classes.linkTab} label="Créer un Utilisateur"  />
          <Tab className={classes.linkTab} label="Statistiques"/>
        </Tabs>
      </AppBar>
      
        <TabPanel value={value} index={0}>
          <TableContainer component={Paper}>
            <Input type="search" className ="textField" id="standard-basic" label="Recherche" variant="standard" onChange={(e) => {
                    setFiltering(e.target.value.length > 0)
                    filtre(e.target.value)}
                  }  />
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell align="center">Prénom</TableCell>
                  <TableCell align="center">Rôle</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                    {filteredList().map((user) => (
                <TableRow key={user.id}>
                  <TableCell  component="th" scope="row">
                    {user.firstName}
                  </TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
              
                  <TableCell align="center">{user.authorities.length >1 ? "Admin" : 'User'}</TableCell>
                  <div className={classes.update}>
                  <TableCell align="right">
                    
                      <ModificationProfilAdmin  user={user} />
                    
                    
                    <Tooltip title="Supprimer" aria-label="Supprimer">
                      <Fab color="secondary" className={classes.fab}>
                        <Delete />
                      </Fab>
                
                    </Tooltip>
                  </TableCell>
                  </div>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      
      <TabPanel value={value} index={1}>
        <Formik
            initialValues={defaultValuesCreateUser}
            validationSchema={schemaFormUpdateUser}
            onSubmit={(values) => {
              createUser(values)
              console.log(values.authorities);
              ;
            }}
          >
            {({ values }) => (
              <Form>
                <div className={classes.formulaire}>
                <Field
                  name="firstName"
                  value={values.firstName}
                  type="input"
                  errorRight
                  className={classes.item}
                  placeholder="Prénom"
                  component={InsyInputText}
                />
                <br/>
                <Field
                  name="lastName"
                  value={values.lastName}
                  type="input"
                  errorRight
                  className={classes.item}
                  placeholder="Nom"
                  component={InsyInputText}
                />
                <br/>
                <Field
                  name="email"
                  value={values.email}
                  type="input"
                  errorRight
                  className={classes.item}
                  placeholder="Email"
                  component={InsyInputText}
                />
                <br/>
                <Field
                  name="login"
                  value={values.login}
                  type="input"
                  errorRight
                  className={classes.item}
                  placeholder="Login"
                  component={InsyInputText}
                />
                </div>
                <Container className={classes.uploadPic}>
                  <img className={classes.profilePic} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile"/>
                  <label htmlFor="contained-button-file">
                  <Input 
                    id="contained-button-file" 
                    multiple type="file" />
                    <Button variant="contained" value={values.imageUrl} component="span" className={classes.upload} >
                      Upload
                    </Button>
                  </label>
                </Container>
                {/*Radio button renvois une chaine de caractère*/}
                  <RadioGroup
                    value="authorities"
                    aria-label="Role"
                    defaultValue="ROLE_ADMIN"
                    name="radio-buttons-group"
                    className={classes.radio}
                    >
                      <label>
                    <Field
                      value= "ROLE_USER"
                      control={<Radio color="primary" />}
                      type="checkbox"
                      color="success"
                      className={classes.rbuton}
                      name="authorities"
                      style={{marginBottom:40}}
                    />
                    User
                    </label>
                    <label>
                    <Field 
                      type="checkbox"
                      name="authorities"
                      value="ROLE_ADMIN"
                      control={<Radio color="primary"/>} 
                      className={classes.rbuton}
                    />
                    Admin
                    </label>
                  </RadioGroup>
                  <div className={classes.bouton} style={{marginLeft:170}}>
                  <Button type="submit" variant="outlined" color="primary" style={{marginRight:20}}>Valider</Button>
                </div>
              </Form>
            )}
          </Formik>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}