import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, Container, Fab, Modal, Snackbar, Tooltip } from '@material-ui/core';

import { IconButton} from '@material-ui/core';
import { Cancel, Create, KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import apiBackEnd from '../../api/backend/api.Backend';
import Loader from '../../shared/components/utils-components/Loader';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Alert } from '@material-ui/lab';
import { Form, Formik } from 'formik';




const useStyles = makeStyles((theme) => ({
 
   TextField:{
      marginLeft:"25px",
  },
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
        width:"90vw",
        height:"60vh",
    },
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

item:{
  marginBottom:theme.spacing(5),
  width:"20vw"
},
upload:{
  marginTop:"5vh",
  marginRight:"5vw",
  right:"7.5vw",
},

bouton:{
  marginTop:"25vh",
},
formulaire:{
  marginTop:"15vh",
  marginLeft:"5vw",
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

function TablePaginationActions(props) {
    const theme = useTheme();
    
    const { count, page, rowsPerPage, onPageChange } = props;
    
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

export default function SearchUsers(user) {
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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const rows=[value]
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
      
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
    
  const [isFiltering, setFiltering]=useState(false);
  const [filtered, setFiltered] = useState();
  const [allUsers, setAllUsers] = useState();
    useEffect(() => {
      apiBackEnd.get("/users").then((res) => {
        
        setAllUsers(res.data);
      });
    }, []);

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
    <>
    <Tooltip title="Ajouter" aria-label="Ajouter" onClick={()=> setOpen(true)}>
    <Fab color="primary" className={classes.fab}>
        <Create />
    </Fab>
</Tooltip>
<Modal open={open}>
    <Container className={classes.container}>
        <div className={classes.title}>
           Choisir et ajouter un invité
        </div>
        <Formik initialValues={{
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    id:user.id,
                }}
                onSubmit= {(values)=>{
                    test(values);
                    setOpen(false);
                    setOpenAlert(true);
                }}
            >
                {({ values }) => (
          <Form>
    <TableContainer>
                            
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell align="left">Prénom</TableCell>
                    <TableCell align="left">email</TableCell>
                    <TableCell align="left">Inviter</TableCell>
                    <TableCell align="left">Cancel</TableCell>
                    </TableRow>
                </TableHead>
            <TableBody >
            {(rowsPerPage > 0
            ? allUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : allUsers
          ).map((user) => (                                                             
            <TableRow key={user.id}>
            {allUsers.filter(user => user.userId === user.id).map(filteredUsers => (
             
                     <TableCell style={{ width: 100 }} align="left">
                
                  {filteredUsers.id}</TableCell>
            ))}              
                            <TableCell style={{ width: 100,  }} component="th" scope="row">
                                {user.firstName}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="left">
                                {user.lastName}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="left">
                                {user.email}
                            </TableCell>                     
                            <TableCell style={{ width: 40 }} align="left">
                         
                            {/*<Button variant="primary" onClick={() => addToCart(chartCount + 1)}></Button>*/}
                                <Button  type="submit" color="primary" fontSize="large" className={classes.btnSending}>
                                    <AddCircleOutlineRoundedIcon />
                                </Button>
                                </TableCell> 
                                <TableCell >
                                <Button>
                                    <Cancel color="primary" fontSize="large"  onClick={()=>setOpen(false)} className={classes.btnCancel}/>
                                </Button>
                            </TableCell>    
                </TableRow>
        ))}       
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                )}
            </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            />
                   </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Form>
    )}
    </Formik>
 
</Container>
</Modal>
 <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
 <Alert onClose={handleClose} severity="success">
     Votre invité recevra une notification par mail
 </Alert>
</Snackbar>
 </>
  );
}
