import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { Card, Button, Form } from 'react-bootstrap';
import Axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');

  const URI = process.env.REACT_APP_API_URL;

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('action', 'login');
    formData.append('userName', userName);
    formData.append('userPwd', userPwd);

    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        if (response.data.login === true) {
          const action = {
            type: types.login,
            payload: { name: userName },
          };
          dispatch(action);
          const lastPath = localStorage.getItem('lastPath') || '/admin';
          navigate(lastPath, {
            replace: true,
          });
        } else {
          alert('Datos incorrectos');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='card-auth'>
      <Card className='card-container'>
        <Card.Body>
          <Card.Title className='card-title'>POSCO MPPC</Card.Title>
          <Card.Text className='card-subTitle'>
            Sistema de Inventarios
          </Card.Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type='text'
                placeholder='ejemplo.usuario'
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type='password'
                placeholder='contraseña'
                value={userPwd}
                onChange={e => setUserPwd(e.target.value)}
              />
            </Form.Group>
            <Button
              className='card-button'
              type='submit'
              onClick={handleSubmit}>
              Iniciar Sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
