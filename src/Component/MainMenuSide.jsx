import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './MainMenuSide.css'; // Import CSS file for custom styles

function MainMenuSide() {
  return (
    <Navbar expand="lg" className="sidebar">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="flex-column">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://static.vecteezy.com/system/resources/previews/002/206/221/non_2x/marketing-icon-free-vector.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Campaign Manager
          </Navbar.Brand>
          <Link to="/customer" className="nav-link">Customer</Link>
          <Link to="/campaign" className="nav-link">Campaign</Link>
          <Link to="/message" className="nav-link">Message</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainMenuSide;
