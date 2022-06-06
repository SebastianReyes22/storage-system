import { useContext, useRef, useState } from 'react';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { AuthContext } from '../../auth/authContext';

export const DeleteProduct = () => {
  const { user } = useContext(AuthContext);

  const URI = process.env.REACT_APP_API_URL;

  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  // const [amount, setAmount] = useState(1);
  const date = new Date().toJSON().slice(0, 19).replace('T', ' ');

  const inputFocus = useRef(null);

  const changeName = e => {
    e.preventDefault();
    setName(e.target.value);
  };
  // POST API to find product
  const handleSubmit = async e => {
    inputFocus.current.select();

    var department = 0;

    if (user.name === 'sistemas') {
      department = 2;
    } else {
      department = 1;
    }

    e.preventDefault();

    let formData = new FormData();
    formData.append('action', 'addProduct');
    formData.append('id_department', department);
    formData.append('name_product', name);
    formData.append('mark', name);
    formData.append('serial_number', name);
    formData.append('description', name);

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
    formData.append('action', 'deleteProduct');
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
    setProducts([]);
    // setAmount(1);
  };

  return (
    <div className='table-pd'>
      <h3 className='title-table text-center mb-3'>
        Eliminar stock del inventario
      </h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm='8'>
            <Form.Group className='mb-4' controlId='formBasicName'>
              <Form.Control
                autoFocus
                ref={inputFocus}
                type='text'
                placeholder='Código, descripción marca o nombre del producto'
                autoComplete='off'
                value={name}
                onChange={changeName}
              />
            </Form.Group>
          </Col>
          <Col sm='2' className='mb-4'>
            <div className='d-grid gap-2'>
              <Button variant='primary' onClick={handleSubmit}>
                <i className='fa-solid fa-magnifying-glass'></i>
              </Button>
            </div>
          </Col>
          <Col sm='2' className='mb-4'>
            <div className='d-grid gap-2'>
              <Button variant='danger' onClick={handleClean}>
                <i className='fa-solid fa-trash'></i>
              </Button>
            </div>
          </Col>
        </Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Marca</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Última fecha de actualización</th>
              <th>Código</th>
              <th>Guardar</th>
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
                  {/*<td>
                    <Form.Control
                      name={product.id}
                      type='number'
                      placeholder=''
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                    />
              </td>*/}
                  <td>
                    <div className='d-grid gap-2'>
                      <Button
                        variant='primary'
                        onClick={e => handleSave(e, product)}>
                        <i className='fa-solid fa-minus' />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Form>
    </div>
  );
};
