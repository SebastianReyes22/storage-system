import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export const ReadOnlyRow = ({ product, handleEditClick }) => {
  return (
    <tr key={product.id}>
      <td className='td-db'>{product.id}</td>
      <td className='td-db'>{product.mark}</td>
      <td className='td-db'>{product.name}</td>
      <td className='td-db'>{product.description}</td>
      <td className='td-db'>{product.quantity}</td>
      <td className='td-db'>{product.ideal_quantity}</td>
      <td className='td-db'>{product.date}</td>
      <td className='td-db'>{product.serial_number}</td>
      <td className='td-db'>
        <div className='bd-btn'>
          <Button variant='warning' onClick={e => handleEditClick(e, product)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </div>
      </td>
      <td className='td-db'>
        <div className='bd-btn'>
          <Button variant='danger'>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </td>
    </tr>
  );
};
