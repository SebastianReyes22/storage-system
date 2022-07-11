import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export const ReadOnlyRow = ({
  product,
  handleSave,
  handleDelete,
  handleEditClick,
}) => {
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.mark}</td>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{product.description}</td>
      <td>{product.date}</td>
      <td>{product.serial_number}</td>
      <td>
        <div className='d-grid gap-2'>
          <Button variant='primary' onClick={e => handleSave(e, product)}>
            +1
          </Button>
        </div>
      </td>
      <td>
        <div className='d-grid gap-2'>
          <Button variant='danger' onClick={e => handleDelete(e, product)}>
            -1
          </Button>
        </div>
      </td>
      <td>
        <div className='d-grid gap-2'>
          <Button variant='warning' onClick={e => handleEditClick(e, product)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </div>
      </td>
    </tr>
  );
};
