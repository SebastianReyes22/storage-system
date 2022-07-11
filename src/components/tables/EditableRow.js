import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

export const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleEditFormSubmit,
}) => {
  return (
    <tr>
      <td>{editFormData.id}</td>
      <td>
        <Form.Control
          name='mark'
          type='text'
          value={editFormData.mark}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Form.Control
          name='name'
          type='text'
          value={editFormData.name}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Form.Control
          name='description'
          type='text'
          value={editFormData.description}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Form.Control
          name='quantity'
          type='text'
          value={editFormData.quantity}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Form.Control
          name='idealQuantity'
          type='text'
          value={editFormData.ideal_quantity}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Form.Control
          name='date'
          type='text'
          value={editFormData.date}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Form.Control
          name='code'
          type='text'
          value={editFormData.serial_number}
          onChange={handleEditFormChange}
        />
      </td>
      <td />
      <td />
      <td className='td-db'>
        <div className='bd-btn'>
          <Button variant='primary' onClick={handleEditFormSubmit}>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
        </div>
      </td>
    </tr>
  );
};
