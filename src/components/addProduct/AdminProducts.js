import { useState } from 'react';
import { Table, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { EditableRow } from '../tables/management/EditableRow';
import { ReadOnlyRow } from '../tables/management/ReadOnlyRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

export const AdminProducts = ({
  inputFocus,
  name,
  setName,
  products,
  setProducts,
  handleSubmit,
  handleClean,
  handleDelete,
  handleSave,
}) => {
  const [editFormData, setEditFormData] = useState([]); // form data to edit
  const [editProductId, setEditProductId] = useState(null); // id of the product to edit
  const URI = process.env.REACT_APP_API_URL; // database url

  // Function to access the edit form
  const handleEditClick = (e, product) => {
    e.preventDefault();
    setEditProductId(product.id);

    const formValues = {
      id: product.id,
      mark: product.mark,
      name: product.name,
      quantity: product.quantity,
      description: product.description,
      date: product.date,
      code: product.serial_number,
    };
    setEditFormData(formValues);
  };

  // Save the edited product
  const handleEditFormChange = e => {
    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  // Function to save the new edited product
  const handleEditFormSubmit = async e => {
    e.preventDefault();

    const editedProduct = {
      id: editFormData.id,
      mark: editFormData.mark,
      name: editFormData.name,
      quantity: editFormData.quantity,
      description: editFormData.description,
      date: editFormData.date,
      serial_number: editFormData.code,
    };

    const newProduct = [...products];
    const index = newProduct.findIndex(
      products => products.id === editedProduct.id,
    );
    newProduct[index] = editedProduct;
    setProducts(newProduct);
    setEditProductId(null);

    let formData = new FormData();
    formData.append('action', 'saveModifiedProduct');
    formData.append('id_product', editFormData.id);
    formData.append('quantity', editFormData.quantity);

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

  return (
    <div className='component'>
      <Col className='mt-2 col-sm-11 mb-5'>
        <Card className='card-style-bitacora'>
          <Card.Header className='titleLogin'>
            Añadir/Quitar stock al inventario
          </Card.Header>
          <Card.Body>
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
                      onChange={e => setName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col sm='2' className='mb-4'>
                  <div className='d-grid gap-2'>
                    <Button variant='primary' onClick={handleSubmit}>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                  </div>
                </Col>
                <Col sm='2' className='mb-4'>
                  <div className='d-grid gap-2'>
                    <Button variant='danger' onClick={handleClean}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </Col>
              </Row>
              <div className='table-style2'>
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
                      <th>Añadir</th>
                      <th>Quitar</th>
                      <th>Editar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map(product => (
                        <>
                          {editProductId === product.id ? (
                            <EditableRow
                              editFormData={editFormData}
                              handleEditFormChange={handleEditFormChange}
                              handleEditFormSubmit={handleEditFormSubmit}
                            />
                          ) : (
                            <ReadOnlyRow
                              product={product}
                              handleEditClick={handleEditClick}
                              handleDelete={handleDelete}
                              handleSave={handleSave}
                            />
                          )}
                        </>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};
