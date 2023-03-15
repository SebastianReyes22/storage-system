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
    <tr key={editFormData.id}>
      <td>{editFormData.id}</td>
      <td>{editFormData.mark}¿</td>
      <td>{editFormData.name}</td>
      <td>
        <Form.Control
          name='quantity'
          type='number'
          value={editFormData.quantity}
          onChange={handleEditFormChange}
        />
      </td>
      <td>{editFormData.description}</td>
      <td>{editFormData.date}</td>
      <td>{editFormData.code}</td>
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
