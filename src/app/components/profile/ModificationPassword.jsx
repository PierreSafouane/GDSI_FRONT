import { makeStyles, Container, Modal, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { InsyInputText } from "../../shared/components/form-and-error-components/InputCustom";
import apiBackEnd from './../../api/backend/api.Backend';
import { schemaFormUpdatePsw } from './../../shared/constants/formik-yup/yup/yupUser';


const useStyle = makeStyles((theme) =>({
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
    },
    span:{
        color: "#0b84ff", 
        "&:hover":{
            textDecoration: "underline",
        },
    }
}));



function ModificationPassword() {
  const classes = useStyle();
  const [open,setOpen] = useState(false);
  
const UpdatePassword = (currentPassword, newPassword) => {
    console.log("mdp actuel : ",currentPassword," new mdp : ",newPassword);
    const changePsw = {currentPassword: currentPassword, newPassword: newPassword};
    apiBackEnd.post("/account/change-password", changePsw).then(() => setOpen(false)).catch(err => console.log("error : ",err.message));
}

  return (
      <>
    <span title="Modifier" aria-label="Modifier" onClick={()=> setOpen(true)} className={classes.span}>
        Modifier mon mot de passe
    </span>
    <Modal open={open}>
        <Container className={classes.container}>
            <div className={classes.title}>
                Modification du mot de passe
            </div>
            <Formik
                initialValues={{
                    userPassword:"",
                    currentPassword:"",
                    newPassword:"",
                    confNewPassword:"",
                }}
                validationSchema={schemaFormUpdatePsw}
                onSubmit= {(values)=>{
                    UpdatePassword(values.currentPassword, values.newPassword);
                }}
            >
                {({ values }) => (
                <Form className={classes.form}>
                    <div className={classes.item}>
                        <Field
                        name="currentPassword"
                        value={values.currentPassword}
                        type="password"
                        fullWidth
                        as={TextField}
                        label="Mot de passe actuel"
                        component={InsyInputText}
                        errorRight
                        />
                    </div>
                    <div className={classes.item}>
                        <Field
                        name="newPassword"
                        value={values.newPassword}
                        type="password"
                        fullWidth
                        as={TextField}
                        label="Nouveau mot de passe"
                        component={InsyInputText}
                        errorRight
                        />
                    </div>
                    <div className={classes.item}>
                        <Field
                        name="confNewPassword"
                        value={values.confNewPassword}
                        type="password"
                        fullWidth
                        as={TextField}
                        label="Comfirmer mot de passe"
                        component={InsyInputText}
                        errorRight
                        />
                    </div>
                    <div className={classes.btnGroup}>
                        <Button type="submit" variant="contained" color="primary" className={classes.btnSending}>Modifier</Button>
                        <Button variant="contained" color="Secondary" onClick={()=>setOpen(false)}  className={classes.btnCancel}>Annuler</Button>
                    </div>
                </Form>
                )}
            </Formik>
        </Container>
    </Modal>
    </>
  );
}

export default ModificationPassword;
