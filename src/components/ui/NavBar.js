import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { Navbar, Container, Nav } from 'react-bootstrap';

export const NavBar = () => {
  // const poscoLogo = `/images/poscoLogo.png`;
  // const withPosco = `/images/withPosco.png`;
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: types.logout });

    navigate('/login', {
      replace: true,
    });
  };

  return (
    <>
      {user.name === 'sistemas' ? (
        <Navbar className='nav-bg' expand='lg' variant='dark'>
          <Container>
            <Navbar.Brand>
              <h1 className='nav-title'>Sistema de Inventarios</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link href='/sistemas'>
                  <h2 className='nav-subtitle'>Inventario {user.name}</h2>
                </Nav.Link>
                <Nav.Link href='/add-product'>
                  <h2 className='nav-subtitle'>Modificar Inventario</h2>
                </Nav.Link>
                <Nav.Link href='/new-product'>
                  <h2 className='nav-subtitle'>Nuevo Producto</h2>
                </Nav.Link>
              </Nav>
              <Nav.Link onClick={handleLogout}>
                <h2 className='nav-subtitle'>
                  <i className='fa-solid fa-arrow-right-from-bracket'></i> Salir
                </h2>
              </Nav.Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar className='nav-bg' expand='lg' variant='dark'>
          <Container>
            <Navbar.Brand>
              <h1 className='nav-title'>Sistema de Inventarios</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link href='/admin'>
                  <h2 className='nav-subtitle'>Inventario {user.name}</h2>
                </Nav.Link>
                <Nav.Link href='/add-product'>
                  <h2 className='nav-subtitle'>Agregar Producto</h2>
                </Nav.Link>
                <Nav.Link href='/new-product'>
                  <h2 className='nav-subtitle'>Nuevo Producto</h2>
                </Nav.Link>
              </Nav>
              <Nav.Link onClick={handleLogout}>
                <h2 className='nav-subtitle'>
                  <i className='fa-solid fa-arrow-right-from-bracket'></i> Salir
                </h2>
              </Nav.Link>
            </Navbar.Collapse>
            {/* <img src={withPosco} alt='poscoLogo' className='logo' /> */}
          </Container>
        </Navbar>
      )}
    </>
  );
};
