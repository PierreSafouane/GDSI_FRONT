import * as React from "react";
import { useEffect, useState } from 'react' ;
import apiBackEnd from "../../api/backend/api.Backend";
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";
import { Card, Button, Fab, Tooltip} from '@material-ui/core';
import { Formik, Form, Field} from "formik";
import { InsyInputText } from "../../shared/components/form-and-error-components/InputCustom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import { Build} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { URL_MODIFICATIONRESERVATIONVIEW} from './../../shared/constants/urls/urlConstants';
import { defaultValuesCreateBooking } from "../../shared/constants/formik-yup/default-values-form/idefaultValuesBooking";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SearchUsers from "./SearchUsers";
import ResponsiveDateTimePickers from "./TimePicker";





const useStyles = makeStyles((theme) => ({
    shadow: { 
      boxShadow: "4px 4px 4px  grey" 
    }, 
    salleResa:{
      height:"50px",
      width:"100%",
      display: "flex",
      alignItems:"center",
    },
    titleg: {
      display: "flex",
      flexDirection:"row",
      color: "white",
      backgroundColor: "#0B84FF", 
      fontSize: "1.5em",
      justifyContent:"center",
      height:"50px",
    },
    h2:{
      width:"60px",
      fontSize:"1em",
    },
    autourDate:{
      width:"700px",
      display: "flex", 
    },
    lespickers:{
      height:"32px",
      width:"700px",
      display: "flex", 
      flexDirection: "row",
    },
    pickers:{
      display: "flex",
      flexDirection: "row",
      width:"500px",
    },
    date:{
      width: "500px",
      paddingLeft:"10px"
    },
   
    marginLeftpickers:{
      marginLeft:"20px"
    },
    span:{
      fontSize:"10px",
      textTransform:"uppercase",
    },
    titres:{
      color:"#6c757d",
    },
    p:{
      marginLeft:"20px",
      textAlign:"center",
      color:"#6c757d",
    },
    lesPlaces:{
      height:"32px",
      width:"700px",
      display: "flex",
    },
    place:{
      display: "flex",
      flexDirection: "row",
    },
    numb:{
      marginTop:"22px",
      height:"32px",
    },
    nombre:{
      paddingLeft:"20px",
      height:"32px",
      width:"270px",
      border:"1px solid #a3a3a3a3",
    },
    btn_group_3:{
      height:"32px",
      width:"700px",
      display: "flex",
    },
    assembler:{
      display:"flex",
      flexDirection:"row",
    },
    round:{
      textAlign:"center" ,
      width:"100px", 
      height:"135px",
    },
    choixSalle:{
      marginTop:"22px",
      height:"32px",
      marginLeft:"20px",
    },
    salle:{
      paddingLeft:"22px",
      height:"32px",
      width:"206px",
      border:"1px solid #a3a3a3a3",
    },
    aligner:{
      display: "flex",
    },
    aligner2:{
      display: "flex",
      flex:"row",
    },
    span2:{ 
      height:"56px",
      paddingTop:"20px",  
    },
}));
  
export default function UserReservation () {
  const classes = useStyles();
console.log('classes'  +classes )
  {/*const test = (values) => {
    console.log("before request : ",values);
    apiBackEnd.put("/users", values).then((res) => {
    console.log(res);
    },(error) => {
     console.log(error);
       });
    
};*/}

 {/* const manageBookingVM ={
bookingDTO:{
title:initialValue.title,
startAt:initialValue.startAt,
finshAt:initialValue.finsishAt,
roomId:initialValue.roomId,
description:initialValue.description,
}
userHostId:actualUser,
userGuestIds:,
  }*/}
{/*----=======*/}
const [actualUser, setActualUser] = useState();
  useEffect(() => {
    apiBackEnd.get("/account").then((res) => {
    setActualUser(res.data);
    });
  }, []);
console.log(actualUser);

const [allUsers, setAllUsers] = useState();
  useEffect(() => {
    apiBackEnd.get("/users").then((res) => {
    setActualUser(res.data);
    console.log("je suis dans mes users" +res.data);
    });
  }, []);
const [allPresence, setAllPresence] = useState([]);
  useEffect(() => {
    apiBackEnd.get("/presences").then((res) => {
    console.log(res.data)
    setAllPresence(res.data);
    console.log("je suis dans mes presences" +res.data);
    });
  }, []);  /* liste de users && isAttending="true" afficher valeurs= /first_name;last_name;email       */
const [allRooms, setAllRooms] = useState([])  ;
  useEffect(() =>{
    apiBackEnd.get("/rooms").then((res) => {
    setAllRooms(res.data);
    console.log("je suis dans mes rooms" +res.data);
    });
  },[]);

const [checked, setChecked] = React.useState(['public']);  
const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    };

const [value, setValue]= useState("");
const handleChange= (e)=>{
    console.log (`typed => $(e.target.value)`);
    setValue(e.target.value);
    };    
const createBooking = (values) => {
    console.log(values)
    apiBackEnd.post("/bookings", values )
    console.log("je suis dans mes reservations", +values);
    };
const usePlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#aaa"
    },
  placeholder2: {
    color: "#aaa"
    },
  }));    
const Placeholder2 = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder2}>{children}</div>;
    };
const [answer2, setAnswer2] = React.useState("");
const Placeholder = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
    };
const [answer, setAnswer] = React.useState("");
const [room, setRoom]=React.useState("");


return (
  <div className={classes.root}>
  <Card 
    className={classes.shadow}
    width="1300px"
    height="800px"
       >   
    <div className={classes.titleg} style={{ width:1235 }}> 
        <h2>Réservation salle :  </h2> 
    </div> 
    <Formik
        initialValues={defaultValuesCreateBooking}
        onSubmit={(values) => {
        createBooking(values)
        console.log(values.title);
        ;
        }}
    >
    {({ values }) => ( 
    <Form> 
      <Box id="0"
              marginLeft="50px"
              display="flex"
              height="600px"
              width="1300px"
              flexDirection="row"
              justifyContent="space-between">          
        <Box id="1"
              marginLeft="70px"
              display="flex"
              height="600px"
              width="1200px"
              flexDirection="column"
              justifyContent="space-around" 
              sx={{
                '& > :not(style)': { m: 1, width: '20ch'},
              }}
              noValidate
              autoComplete="off"
            >
              <div className={classes.shadow2}>
                <Field 
                    value={values.title}       
                    style={{ width:700 }}
                    type="input"
                    name="title"
                    placeholder="Ajoutez un titre : "
                    component={InsyInputText}
                    fullWidth
                    errorRight
                  /> 
              </div> 
              <div className= {classes.aligner}>
                <div className= {classes.aligner2}> <span className= {classes.span2}><p>Ajouter un invité : </p></span>
                  </div> 
                      <div>
                        <SearchUsers/>
                      </div>
                  </div>
                      {/* <div className={classes.shadow2} style={{}}>
                          <Field 
                              style={{ width:700 }}
                              type="input"
                              name="guest"   
                              placeholder="Invitez des participants: "
                              component={InsyInputText}
                              fullWidth
                              errorRight
                              id="outlined-1" 
                              label="Invitez des participants: " 
                              variant="outlined" 
                            /> 
                        </div>*/}
        <div>
            <Box id="10" className={classes.autourDate}>                       
                <div className={classes.titres}> <span>Date début: </span></div>
                    <div className={classes.pickers}> 
                        <div>
                            <ResponsiveDateTimePickers/>
                        </div>       
                    </div>
                <div className={classes.titres}> <span>Date fin: </span></div>
                    <div className={classes.pickers}> 
                             <ResponsiveDateTimePickers/>                     
                    </div>
                     </Box>
                     </div>
                        <Box id="3" className="lesPlaces" > 
                              <div className={classes.place}> 
                                <div style={{ width:320}}>
                                    <List>
                                      <ListItem style={{ width:200 }}>  
                                        <ListItemText id="switch-list-label-public" primary="public" />
                                        <Switch
                                          onChange={handleToggle('public')}
                                          checked={checked.indexOf('public') !== -1}
                                          inputProps={{
                                            'aria-labelledby': 'switch-list-label-public',
                                          }}
                                        />
                                        <ListItemText id="switch-list-label-privé" primary="privé" />
                                      </ListItem>
                                    </List> 
                                </div>
                                <Box className={classes.numb}> 
                                  <Select
                                    className={classes.placeholder2}
                                    value={answer2} 
                                    displayEmpty
                                    onChange={event => setAnswer2(event.target.value)}
                                    renderValue={
                                      answer2 !== "" ? undefined : () => <Placeholder2>Nombre de places : </Placeholder2>
                                    }
                                  >
                       {allRooms.map((room,index)=>{
                        return(
                          <MenuItem key={index}> {room.maxCapacity}</MenuItem> 
                        )  
                      })}</Select>
                      {/*recupere la présence suite à map */}   
                                 {/* <MenuItem value={"1"}>Nombre de places : 8</MenuItem>  
                                  <MenuItem value={"2"}>Nombre de places : 9</MenuItem>
                                  <MenuItem value={"3"}>Nombre de places : 10</MenuItem>
                                  <MenuItem value={"4"}>Nombre de places : 11</MenuItem>
                                  <MenuItem value={"5"}>Nombre de places : 12</MenuItem>*/}
                                  
                        {/*  <div className={classes.nombre}><p>Nombre max de places : </p></div>*/}
                                </Box>
                                <div>
                                <Box className={classes.choixSalle}> 
                                    <div>
                                       <Select
                                        value={answer}
                                        selected
                                        displayEmpty
                                        onChange={event => setAnswer(event.target.value)}
                                        renderValue={
                                          answer !== "" ? undefined : () => <Placeholder> Choix salle: 
                                            
                                           </Placeholder>
                                        }
                                      >   
                                      {allRooms.map((room,index)=>{
                                            return(
                                              <MenuItem  key={index}>{room.id}</MenuItem>
                                            )
                                          })}                    
                                      </Select>
                                  </div>
                                </Box>
                            </div>
                            </div>
                        </Box>
                <Field
                      type="input"
                      label="Ajoutez une description : "
                      multiline
                      rows={4}
                      as={TextField}
                      name="description"
                      onChange={handleChange}
                      variant="standard" 
                      value={values.description}
                      style={{ width: 700 }}          
                />         
        </Box>
  
        <Box id="4"
                  style={{ width:700, marginTop:25 }}
                  position="relative"
                  display="flex"
                  flexWrap="noWrap"
                  height="740px"
                  flexDirection="column"
                  > 
            <Card 
                  className={classes.shadow}
                  type="textarea"
                  name="inviteResa"
                  placeholder="Invités: "
                  style={{ width:200, height:425}}       
                  id="outlined-3" 
                  label="liste des participants " 
                  >
                  <h5>Invités</h5>
                  <br/>
                  <div> 
                      
                  </div>    
            </Card>
            <Box className="btn_group_3"  style={{top:40, width:200, height:135 }}>
              <div className={classes.assembler}>
                  <Box
                      id="regroupButton" 
                      className="btgroup"
                      display="flex"
                      flexDirection="column"
                      style={{top:40, width:100, height:135 }}
                      justifyContent="space-around"
                      position="center"
                  >
                    <div>
                        <Button
                          type="submit" 
                          size="large"
                          variant="contained"
                          color="primary"
                        >
                          Valider
                        </Button>
                    </div>
                    <div >
                        <Button
                          id="btn-cancel"
                          size="large"
                          type="cancel"
                          variant="contained"
                          color="primary"
                          onChange={handleChange}
                        >
                        Annuler
                      </Button>
                    </div>
                </Box>
                <Box className={classes.round} id="12"  style={{top:50, width:100, height:135 }}>
                  <div>
                      <Link to={URL_MODIFICATIONRESERVATIONVIEW}>
                          
                            <Tooltip title="Modifier" aria-label="">
                              <Fab color="primary" className={classes.fab}>
                                <Build/>
                              </Fab>
                            </Tooltip>
                         
                      </Link>
                    </div>
                </Box>
              </div>
            </Box>
          </Box>
        </Box>
      </Form>  
    )}
    </Formik>     
   </Card>
</div>
);
};
  