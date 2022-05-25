import Axios from 'axios';
import { useContext, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../auth/authContext';

export const NewProduct = () => {
  const URI = process.env.REACT_APP_API_URL;

  const [mark, setMark] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [idealQuant, setIdealQuant] = useState(0);
  const [code, setCode] = useState('');
  const date = new Date().toJSON().slice(0, 19).replace('T', ' ');

  const { user } = useContext(AuthContext);

  const handleSubmit = async () => {
    var department = 0;

    if (user.name === 'sistemas') {
      department = 2;
    } else {
      department = 1;
    }
    console.log(department);

    let formData = new FormData();
    formData.append('action', 'newProduct');
    formData.append('mark', mark);
    formData.append('name_product', name);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('ideal_quantity', idealQuant);
    formData.append('serial_number', code);
    formData.append('date', date);
    formData.append('id_department', department);
    console.log(department);
    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        if (response.data.status === false) {
          alert('Datos no encontrados');
        } else {
          alert('Producto agregado');
          hableClean();
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  const hableClean = () => {
    setMark('');
    setName('');
    setDescription('');
    setQuantity(0);
    setIdealQuant(0);
    setCode('');
  };

  return (
    <div className='table-pd'>
      <h3 className='title-table text-center mb-3'>Alta de producto</h3>
      <Form>
        <Row>
          <Col sm='4'>
            <Form.Group className='mb-3' controlId='formBasicMark'>
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type='text'
                placeholder='Coca-Cola'
                value={mark}
                onChange={e => setMark(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='text'
                placeholder='Coca-Cola Zero'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group className='mb-3' controlId='formBasicDesc'>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type='text'
                placeholder='Lata 355 ml'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group className='mb-3' controlId='formBasicQuant'>
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type='number'
                placeholder='123456'
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group className='mb-3' controlId='formBasicIdealQuant'>
              <Form.Label>Cantidad Ideal</Form.Label>
              <Form.Control
                type='number'
                placeholder='123456'
                value={idealQuant}
                onChange={e => setIdealQuant(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group className='mb-3' controlId='formBasicSerial'>
              <Form.Label>Código</Form.Label>
              <Form.Control
                type='text'
                placeholder='7501557894548'
                value={code}
                onChange={e => setCode(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm='8' />
          <Col sm='2'>
            <div className='d-grid gap-2'>
              <Button
                variant='primary'
                className='btn-lg mt-4'
                onClick={handleSubmit}>
                <i className='fa-solid fa-floppy-disk' />
              </Button>
            </div>
          </Col>
          <Col sm='2'>
            <div className='d-grid gap-2'>
              <Button
                variant='danger'
                className='btn-lg mt-4'
                onClick={hableClean}>
                <i className='fa-solid fa-trash'></i>
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
