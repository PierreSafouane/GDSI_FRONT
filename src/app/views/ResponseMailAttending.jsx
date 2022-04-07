import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import apiBackEnd from '../api/backend/api.Backend';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    trueStyle:{
        backgroundColor:"#15A51A",
        color:"white",
        border:"solid 2px",
        textAlign:"center",
    },
    falseStyle:{
        backgroundColor:"#D91714",
        color:"white",
        border:"solid 2px",
        textAlign:"center",
    }
}));


const TrueText = () => {
    const classes = useStyle();
    return (
        <h1 className={classes.trueStyle}>Vous avez accepté l'invitation</h1>
    )
}

const FalseText = () => {
    const classes = useStyle();
    return (
        <h1 className={classes.falseStyle}>Vous avez refusé l'invitation</h1>
    )
}

const ResponseMailAttending = () => {
    const location = new URLSearchParams(useLocation().search)
    const presence = {
        id:location.get("presenceId"),
        isAttending:location.get("isAttending"),
        appUserId:location.get("userId"),
        bookingId:location.get("bookingId")
    }

    useEffect(() => {
        console.log("presence test : ",presence);
        apiBackEnd.put("/presences",presence);
    }, []);

    

    return(
        presence.isAttending === "true" ? TrueText() : FalseText()
    )

}

export default ResponseMailAttending;