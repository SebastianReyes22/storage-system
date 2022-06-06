import { Button, Form } from 'react-bootstrap';

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleEditFormSubmit,
}) => {
  return (
    <tr key={editFormData.id}>
      <td>{editFormData.id}</td>
      <td>{editFormData.mark}</td>
      <td>{editFormData.name}</td>
      <td>{editFormData.quantity}</td>
      <td>{editFormData.description}</td>
      <td>{editFormData.date}</td>
      <td>{editFormData.serial_number}</td>
      <td>
        <Form.Control
          name='quantity'
          type='number'
          placeholder=''
          value={1}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Button variant='primary' onClick={handleEditFormSubmit}>
          <i className='fa-solid fa-floppy-disk' />
        </Button>
      </td>
    </tr>
  );
};

export default EditableRow;
