import { NavBar } from '../ui/NavBar';
import { Form, Button, Table } from 'react-bootstrap';
import { useState } from 'react';

export const AddProduct = () => {
  const [products, setProducts] = useState([]);

  return (
    <>
      <NavBar />
      <div className='table-pd'>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>Producto a buscar</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nombre / Marca / Código'
              value={products}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>Área del producto</Form.Label>
            <Form.Select className='mb-3'>
              <option>Administración</option>
              <option>Sistemas</option>
            </Form.Select>
          </Form.Group>
          <Button variant='primary' type='submit'>
            <i className='fa-solid fa-magnifying-glass'></i>
          </Button>
          <Button variant='danger' type='submit'>
            <i className='fa-solid fa-trash'></i>
          </Button>
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
