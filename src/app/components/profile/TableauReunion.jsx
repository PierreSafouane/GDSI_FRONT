import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHead from "@material-ui/core/TableHead";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Button } from "@material-ui/core";
import Cancel from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core";
import apiBackEnd from "./../../api/backend/api.Backend";
import { useState, useEffect } from "react";
import { parseDateToZoneDate } from "./../../shared/services/dateService";
import { Link } from "react-router-dom";
import { URL_USERBOOKINGHISTORY } from "../../shared/constants/urls/urlConstants";

const useStyle = makeStyles((theme) => ({
  btnSending: {
    color: "#0b84ff",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  btnCancel: {
    color: "#D91714",
    "&:hover": {
      backgroundColor: "#fbfbfb",
      color: "#D91714",
      borderColor: "#D91714",
    },
  },
  btnHistory: { marginBottom: "1em" },
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
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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

export default function TableauReuunion({ account }) {
  const classes = useStyle();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [allPresence, setAllPresence] = useState([]);
  useEffect(() => {
    apiBackEnd
      .get(
        "/presences/presenceByUserAfterDate/" +
          JSON.parse(localStorage.getItem("actualUser")).id
      )
      .then((res) => {
        console.log(res.data);
        setAllPresence(res.data);
      });
  }, [account]);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allPresence.length) : 0;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.tabAndButton}>
      <Link to={URL_USERBOOKINGHISTORY}>
        <Button
          className={classes.btnHistory}
          type="submit"
          variant="contained"
          color="primary"
        >
          Historique de mes réunions
        </Button>
      </Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="center">Réservation</TableCell>
              <TableCell align="center">Salles</TableCell>
              <TableCell align="center">Statut</TableCell>
              <TableCell align="center">Présence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? allPresence.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : allPresence
            ).map((presence) => (
              <TableRow key={presence.id}>
                <TableCell style={{ width: 160 }} component="th" scope="row">
                  {parseDateToZoneDate(presence.booking.startAt)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {presence.booking.title}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {presence.booking.room.id}
                </TableCell>
                <TableCell style={{ width: 40 }} align="center">
                  {presence.isAttending
                    ? "Participe"
                    : presence.isAttending === null
                    ? "En attente"
                    : "Participe pas"}
                </TableCell>
                <TableCell style={{ width: 40 }} align="center">
                  <Button>
                    <CheckCircleIcon
                      fontSize="large"
                      className={classes.btnSending}
                    />
                  </Button>
                  <Button>
                    <Cancel fontSize="large" className={classes.btnCancel} />
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
            <TableRow className={classes.bottomRow}>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                colSpan={3}
                count={allPresence.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
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
    </div>
  );
}
