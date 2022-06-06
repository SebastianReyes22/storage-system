import { Button, Form } from 'react-bootstrap';

const ReadOnlyRow = ({ product, handleEdit }) => {
  <tr key={product.id}>
    <td>{product.id}</td>
    <td>{product.mark}</td>
    <td>{product.name}</td>
    <td>{product.quantity}</td>
    <td>{product.description}</td>
    <td>{product.date}</td>
    <td>{product.serial_number}</td>
    <td>
      <Form.Control name={product.id} type='number' placeholder='' value={1} />
    </td>
    <td>
      <Button variant='primary' onClick={handleEdit}>
        <i className='fa-solid fa-floppy-disk' />
      </Button>
    </td>
  </tr>;
};

export default ReadOnlyRow;
