import { NavBar } from '../ui/NavBar';
import { Form, Button, Table, Col } from 'react-bootstrap';
import { useState } from 'react';

export const AddProduct = () => {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState('');
  const [mark, setMark] = useState('');
  const [code, setCode] = useState('');

  return (
    <>
      <NavBar />
      <div className='table-pd'>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nombre del producto'
              value={name}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicMark'>
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type='text'
              placeholder='Coca-Cola / Pepsi'
              value={mark}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCode'>
            <Form.Label>Código</Form.Label>
            <Form.Control type='text' placeholder='123456789' value={code} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>Área del producto</Form.Label>
            <Form.Select className='mb-3'>
              <option>Administración</option>
              <option>Sistemas</option>
            </Form.Select>
          </Form.Group>
          <Col sm='2'>
            <div className='d-grid gap-2'>
              <Button variant='primary' type='submit'>
                <i className='fa-solid fa-magnifying-glass'></i>
              </Button>
            </div>
          </Col>
          <Col sm='2'>
            <div className='d-grid gap-2'>
              <Button variant='danger' type='submit'>
                <i className='fa-solid fa-trash'></i>
              </Button>
            </div>
          </Col>
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
                      <Form.Control type='number' placeholder='' />
                    </td>
                    <td>
                      <Button variant='primary' type='submit'>
                        <i className='fa-solid fa-floppy-disk'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Form>
      </div>
    </>
  );
};
