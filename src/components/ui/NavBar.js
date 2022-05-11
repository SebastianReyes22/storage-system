import { Navbar, Container, Nav } from 'react-bootstrap';

export const NavBar = () => {
  return (
    <Navbar className='nav-bg' expand='lg'>
      <Container>
        <Navbar.Brand href='#home'>Sistema de Inventarios</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/admin'>Administración</Nav.Link>
            <Nav.Link href='#link'>Sistemas</Nav.Link>
            <Nav.Link href='/add-product'>Agregar Producto</Nav.Link>
            <Nav.Link href='/new-product'>Nuevo Producto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
