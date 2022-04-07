import React, { useEffect } from "react";

const GuestsList = ({ guests }) => {
  if (guests.length > 0) {
    console.log("if");
    return guests.map((guest, index) => {
      return (
        <div className="col-sm">
          <div className="row" key={index}>
            {guest.label}
          </div>
        </div>
      );
    });
  }
  if (guests.length < 1) {
    return <div>Aucun Participant</div>;
  }
};

export default GuestsList;
