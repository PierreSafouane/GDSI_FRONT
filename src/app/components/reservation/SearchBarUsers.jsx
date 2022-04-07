import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Loader from "./../../shared/components/utils-components/Loader";
import apiBackEnd from "../../api/backend/api.Backend";

const guests = [];
const SearchBarUsers = ({ users, setList }) => {
  if (guests.length < users.length) {
    users.map((user) =>
      guests.push({ label: user.firstName + " " + user.lastName, id: user.id })
    );
  }

  if (!users) return <Loader />;
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={guests}
      sx={{ width: 570 }}
      renderInput={(params) => (
        <TextField {...params} label="Inviter des participants" />
      )}
      onChange={(event, newValue) => {
        setList(newValue);
      }}
    />
  );
};

export default SearchBarUsers;
