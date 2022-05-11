import { Card, Button, Form } from 'react-bootstrap';
export const Login = () => {
  return (
    <div className='card-auth'>
      <Card className='card-container'>
        <Card.Body>
          <Card.Title className='card-title'>POSCO MPPC</Card.Title>
          <Card.Text className='card-subTitle'>
            Sistema de Inventarios
          </Card.Text>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Usuario</Form.Label>
              <Form.Control type='email' placeholder='ejemplo.usuario' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type='password' placeholder='contraseña' />
            </Form.Group>
            <Button className='card-button' type='submit'>
              Iniciar Sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
