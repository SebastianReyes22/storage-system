import { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form, Col } from 'react-bootstrap';

export const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const navigate = useNavigate();
  const { logIn } = useUserAuth();
  let email = '';

  // Submit form
  const handleSubmit = async () => {
    email = userName + '@poscomppc.com';
    try {
      await logIn(email, userPwd);
      if (userName == 'sistemas') {
        navigate('/sistemas');
      } else if (userName == 'admin') {
        navigate('/admin');
      } else {
        alert('Usuario no valido, comuniquece con el administrador');
      }
    } catch (error) {
      alert('Algo salio mal' + error);
      console.log(error);
    }
  };

  //Evento cuando se presiona la tecla Enter
  const handleSubmitInput = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='component'>
      <Col className='col-sm-4 mt-5'>
        <Card className='card-style-login'>
          <Card.Header className='titleLogin'>
            Sistema de Inventarios
          </Card.Header>
          <h3 className='subTitleLogin'>POSCO MPPC</h3>
          <Card.Body>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label> 👤 Usuario</Form.Label>
                <Form.Control
                  autoComplete='off'
                  focus={true}
                  onChange={e => setUserName(e.target.value)}
                  placeholder='ejemplo.usuario'
                  value={userName}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label> 🔒 Contraseña</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='*****************'
                  value={userPwd}
                  onChange={e => setUserPwd(e.target.value)}
                  onKeyDown={handleSubmitInput}
                />
              </Form.Group>
              <div className='d-grid gap-2'>
                <Button onClick={handleSubmit} variant='primary' size='lg'>
                  Ingresar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};
