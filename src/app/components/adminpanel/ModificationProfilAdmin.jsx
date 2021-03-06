import { makeStyles, Tooltip, Fab, Container, Modal, TextField, Button, Snackbar } from '@material-ui/core';
import { Create } from "@material-ui/icons";
import { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Formik, Form, Field } from 'formik';
import { schemaFormUpdateUser } from './../../shared/constants/formik-yup/yup/yupUser';
import { InsyInputText } from "../../shared/components/form-and-error-components/InputCustom";
import apiBackEnd from './../../api/backend/api.Backend';


const useStyle = makeStyles((theme) =>({
    fab:{
        position:"relative",
        left:"95%",
    },
    container:{
        width:"50vw",
        height:"50vh",
        backgroundColor:"white",
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        margin:"auto",
        padding:0,
        [theme.breakpoints.down("sm")]:{
            width:"60vw",
            height:"60vh",
        },
        [theme.breakpoints.down("xs")]:{
            width:"100vw",
            height:"60vh",
        },
    },
    form:{
        padding:theme.spacing(2),
    },
    item:{
        marginBottom:theme.spacing(5),
        marginLeft:theme.spacing(5),
        marginRight:theme.spacing(5),
    },
    title:{
        border:"solid 5px #0B84FF",
        color: "white",
        backgroundColor: "#0B84FF",
        fontSize: "26px",
        textAlign: "center",
        [theme.breakpoints.down("sm")]:{
            border:"solid 3px #0B84FF",
            color: "white",
            backgroundColor: "#0B84FF",
            fontSize: "20px",
            textAlign: "center",
        },
    },
    btnGroup: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2em",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
        },
      },
    btnSending:{
        boxShadow: "1px 1px 1px  grey",
        marginRight: "2em",
        border: "2px solid",
        borderColor: "#0b84ff",
        marginBottom: "2em",
        "&:hover": {
            backgroundColor: "#fbfbfb",
            color: "#0b84ff",
            borderColor: "#0b84ff",
        },
    },
    btnCancel:{
        boxShadow: "1px 1px 1px  grey",
        marginRight: "2em",
        border: "2px solid",
        borderColor: "#D91714",
        marginBottom: "2em",
        "&:hover": {
            backgroundColor: "#fbfbfb",
            color: "#D91714",
            borderColor: "#D91714",
        },
    }
    
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ModificationProfilAdmin({user}) {
  const classes = useStyle();
  const [open,setOpen] = useState(false);
  const [openAlert,setOpenAlert] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenAlert(false);
  };

  const test = (values) => {
      console.log("before request : ",values);
      apiBackEnd.put("/users", values).then((res) => {
      console.log(res);
      },(error) => {
       console.log(error);
         });
      
  };

  return (
      <>
    <Tooltip title="Modifier" aria-label="Modifier" onClick={()=> setOpen(true)}>
        <Fab color="primary" className={classes.fab}>
            <Create />
        </Fab>
    </Tooltip>
    <Modal open={open}>
        <Container className={classes.container}>
            <div className={classes.title}>
                Modification du profil
            </div>
            <Formik
                initialValues={{
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    login:user.login,
                    id:user.id,
                    authorities:user.authorities,
                }}
                validationSchema={schemaFormUpdateUser}
                onSubmit= {(values)=>{
                    test(values);
                    setOpen(false);
                    setOpenAlert(true);
                }}
            >
                {({ values }) => (
                <Form className={classes.form}>
                    <div className={classes.item}>
                        <Field
                        name="firstName"
                        value={values.firstName}
                        type="input"
                        fullWidth
                        as={TextField}
                        label="Pr??nom"
                        component={InsyInputText}
                        errorRight
                        />
                    </div>
                    <div className={classes.item}>
                        <Field
                        name="lastName"
                        value={values.lastName}
                        type="input"
                        fullWidth
                        as={TextField}
                        label="Nom"
                        component={InsyInputText}
                        errorRight
                        />
                    </div>
                    <div className={classes.item}>
                        <Field
                        name="email"
                        value={values.email}
                        type="input"
                        fullWidth
                        as={TextField}
                        label="Email"
                        component={InsyInputText}
                        errorRight
                        />
                    </div>
                    <div className={classes.btnGroup}>
                        <Button type="submit" variant="contained" color="primary" className={classes.btnSending}>Modifier</Button>
                        <Button variant="contained" color="secondary" onClick={()=>setOpen(false)}  className={classes.btnCancel}>Annuler</Button>
                    </div>
                </Form>
                )}
            </Formik>
        </Container>
    </Modal>
    <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={handleClose} severity="success">
            Modification r??ussie
        </Alert>
    </Snackbar>
    </>
  );
}

export default ModificationProfilAdmin;
