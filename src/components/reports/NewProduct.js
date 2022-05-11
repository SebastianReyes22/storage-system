import { NavBar } from '../ui/NavBar';
import { Form, Button } from 'react-bootstrap';

export const NewProduct = () => {
  return (
    <>
      <NavBar />
      <div className='table-pd'>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicMark'>
            <Form.Label>Marca</Form.Label>
            <Form.Control type='text' placeholder='Coca-Cola' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type='text' placeholder='Coca-Cola Zero' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicDesc'>
            <Form.Label>Descripción</Form.Label>
            <Form.Control type='text' placeholder='Lata 355 ml' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicQuant'>
            <Form.Label>Cantidad</Form.Label>
            <Form.Control type='numeric' placeholder='123456' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicSerial'>
            <Form.Label>Código</Form.Label>
            <Form.Control type='text' placeholder='7501557894548' />
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
        </Form>
      </div>
    </>
  );
};
