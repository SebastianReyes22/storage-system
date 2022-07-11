import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useUserAuth } from '../../context/UserAuthContext';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import poscoLogo from '../../images/poscoLogo.png';
import withPosco from '../../images/withPosco.png';

export const NavBar = () => {
  // const poscoLogo = `/images/poscoLogo.png`;
  // const withPosco = `/images/withPosco.png`;
  const { user, logOut } = useUserAuth();

  const handleLogout = async () => {
    if (window.confirm('¿Seguro que desea cerrar sesión?')) {
      try {
        await logOut();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {user.email == 'sistemas@poscomppc.com' ? (
        <Navbar className='card-style'>
          <Container>
            <Navbar.Brand>
              <img src={poscoLogo} className='img-logo' alt='Posco' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Nav className='me-auto'>
              <Nav.Link href='./sistemas'>
                <h2 className='nav-subtitle'>Inventario</h2>
              </Nav.Link>
              <Nav.Link href='./add-product'>
                <h2 className='nav-subtitle'>Añadir Stock</h2>
              </Nav.Link>
              <Nav.Link href='./new-product'>
                <h2 className='nav-subtitle'>Nuevo Producto</h2>
              </Nav.Link>
              <Nav.Link href='./dashboard'>
                <h2 className='nav-subtitle'>Base de Datos</h2>
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>
                <h2 className='nav-subtitle nav-left'>
                  <FontAwesomeIcon icon={faArrowAltCircleRight} /> Salir
                </h2>
              </Nav.Link>
            </Nav>
            <Navbar.Brand>
              <img src={withPosco} className='img-withPosco' alt='withPosco' />
            </Navbar.Brand>
          </Container>
        </Navbar>
      ) : (
        <Navbar className='card-style'>
          <Container>
            <Navbar.Brand>
              <img src={poscoLogo} className='img-logo' alt='Posco' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Nav className='me-auto'>
              <Nav.Link href='./admin'>
                <h2 className='nav-subtitle'>Inventario</h2>
              </Nav.Link>
              <Nav.Link href='./add-product'>
                <h2 className='nav-subtitle'>Añadir Stock</h2>
              </Nav.Link>
              <Nav.Link href='./new-product'>
                <h2 className='nav-subtitle'>Nuevo Producto</h2>
              </Nav.Link>
              <Nav.Link href='./dashboard'>
                <h2 className='nav-subtitle'>Base de Datos</h2>
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>
                <h2 className='nav-subtitle nav-left'>
                  <FontAwesomeIcon icon={faArrowAltCircleRight} /> Salir
                </h2>
              </Nav.Link>
            </Nav>
            <Navbar.Brand>
              <img src={withPosco} className='img-withPosco' alt='withPosco' />
            </Navbar.Brand>
          </Container>
        </Navbar>
      )}
    </>
  );
};
