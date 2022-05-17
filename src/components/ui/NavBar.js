import { Navbar, Container, Nav } from 'react-bootstrap';

export const NavBar = () => {
  // const poscoLogo = `/images/poscoLogo.png`;
  // const withPosco = `/images/withPosco.png`;

  return (
    <Navbar className='nav-bg' expand='lg' variant='dark'>
      {/* <img src={poscoLogo} alt='poscoLogo' className='logo' /> */}
      <Container>
        <Navbar.Brand>
          <h1 className='nav-title'>Sistema de Inventarios</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/admin'>
              <h2 className='nav-subtitle'>Administración</h2>
            </Nav.Link>
            <Nav.Link href='/sistemas'>
              <h2 className='nav-subtitle'>Sistemas</h2>
            </Nav.Link>
            <Nav.Link href='/add-product'>
              <h2 className='nav-subtitle'>Agregar Producto</h2>
            </Nav.Link>
            <Nav.Link href='/new-product'>
              <h2 className='nav-subtitle'>Nuevo Producto</h2>
            </Nav.Link>
          </Nav>
          <Nav.Link href='/'>
            <h2 className='nav-subtitle'>
              <i className='fa-solid fa-arrow-right-from-bracket'></i> Salir
            </h2>
          </Nav.Link>
        </Navbar.Collapse>
        {/* <img src={withPosco} alt='poscoLogo' className='logo' /> */}
      </Container>
    </Navbar>
  );
};
