import React, { useState } from "react";
import { Checkbox, makeStyles } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";

const useStyles = makeStyles({
  palette: {
    primary: {
      main: "#0B84FF",
    },
    secondary: {
      main: "#D91714",
    },
  },
});

const RememberMeCheck = () => {
  const [checked, setChecked] = useState(false);
  const classes = useStyles;
  return (
    <FormControlLabel
      control={
        <Checkbox
          className={classes.Checkbox}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          color="primary"
        ></Checkbox>
      }
      label="Se souvenir de moi"
    />
  );
};
export default RememberMeCheck;
