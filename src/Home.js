import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import TopBar from './TopBar';

const Home = () => {
  return (
    <div>
      <TopBar/>
      <Container fluid>
        <div>Business owner</div>
        <Button color="danger" tag={Link} to="/smoothies/edit">Manage smoothies</Button>
        <p />
        <div>End user</div>
        <Button color="primary" tag={Link} to="/smoothies/view">Show smoothies</Button>
      </Container>
    </div>
  );
}

export default Home;