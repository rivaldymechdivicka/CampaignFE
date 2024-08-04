import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MainMenu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="data:image/png;base64,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"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Campaign Management System
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav
            className="ms-auto my-2 my-lg-0" // Mengubah 'me-end' menjadi 'ms-auto'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Beranda</Nav.Link>
            <Nav.Link href="#action2">Campaign Info</Nav.Link>
            <Nav.Link href="#action2">Profil Campaign</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainMenu;