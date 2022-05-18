import { useState } from 'react';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export const AddProduct = () => {
  const URI = process.env.REACT_APP_API_URL;

  const [products, setProducts] = useState([]);

  const [name, setName] = useState('');
  const [mark, setMark] = useState('');
  const [code, setCode] = useState('');
  const [department, setDepartment] = useState('');

  const [amount, setAmount] = useState(1);
  const date = new Date().toJSON().slice(0, 19).replace('T', ' ');

  // POST API to find product
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('action', 'addProduct');
    formData.append('name_product', name);
    formData.append('mark', mark);
    formData.append('serial_number', code);
    formData.append('id_department', department);

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
          setProducts(response.data);
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  // POST API to add product
  const handleSave = async (e, product) => {
    let formData = new FormData();
    formData.append('action', 'saveProduct');
    formData.append('quantity', amount);
    formData.append('id_product', product.id);
    formData.append('date', date);

    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        if (response.data.status === false) {
          alert('Error, no se pudo actualizar el producto');
        } else {
          alert('Producto actualizado');
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  // Clean state
  const handleClean = () => {
    setName('');
    setMark('');
    setCode('');
    setProducts([]);
  };

  return (
    <div className='table-pd'>
      <h3 className='title-table text-center mb-3'>Modificar inventario</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm='4'>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nombre del producto'
                autoComplete='off'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group className='mb-3' controlId='formBasicMark'>
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type='text'
                placeholder='Coca-Cola / Pepsi'
                autoComplete='off'
                value={mark}
                onChange={e => setMark(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group className='mb-3' controlId='formBasicCode'>
              <Form.Label>Código</Form.Label>
              <Form.Control
                type='number'
                placeholder='123456789'
                autoComplete='off'
                maxLength={19}
                value={code}
                onChange={e => setCode(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group className='mb-3' controlId='formBasicDepartment'>
              <Form.Label>Área del producto</Form.Label>
              <Form.Select
                className='mb-3'
                placeholder='Nombre del departamento'
                value={department}
                onChange={e => setDepartment(e.target.value)}>
                <option>Seleccionar Departamento</option>
                <option value={1}>Administración</option>
                <option value={2}>Sistemas</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm='4' />
          <Col sm='2' className='mt-4'>
            <div className='d-grid gap-2'>
              <Button variant='primary' onClick={handleSubmit}>
                <i className='fa-solid fa-magnifying-glass'></i>
              </Button>
            </div>
          </Col>
          <Col sm='2' className='mt-4'>
            <div className='d-grid gap-2'>
              <Button variant='danger' onClick={handleClean}>
                <i className='fa-solid fa-trash'></i>
              </Button>
            </div>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Marca</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Última fecha de actualización</th>
              <th>Código</th>
              <th>Agregar</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.mark}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>{product.date}</td>
                  <td>{product.serial_number}</td>
                  <td>
                    <Form.Control
                      name={product.id}
                      type='number'
                      placeholder=''
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                    />
                  </td>
                  <td>
                    <Button
                      variant='primary'
                      onClick={e => handleSave(e, product)}>
                      <i className='fa-solid fa-floppy-disk'></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Form>
    </div>
  );
};
