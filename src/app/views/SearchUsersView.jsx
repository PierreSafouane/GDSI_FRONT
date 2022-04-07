import React from 'react';
import Container from "@material-ui/core/Container";
import SearchUsers from '../components/reservation/SearchUsers.jsx';

const SearchUsersView = () => {
  return (
    <Container className="mt-5">
      <SearchUsers />
    </Container>
  );
};

export default SearchUsersView;
