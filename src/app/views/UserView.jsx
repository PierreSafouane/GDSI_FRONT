import UserCard from "../components/profile/UserCard"
import Container from '@material-ui/core/Container'
import React, { useEffect, useState } from "react";
import apiBackEnd from './../api/backend/api.Backend';

const UserView = () => {

    const [actualUser, setActualUser] = useState();
    useEffect(() => {
        apiBackEnd.get("/account").then((res) => {
        setActualUser(res.data);
    });
    }, []);
    console.log("request : ",actualUser);
    

    return (
        <Container className="mt-5">
            <UserCard account={actualUser} setAccount={setActualUser}/>
        </Container>
    )
}
export default UserView;