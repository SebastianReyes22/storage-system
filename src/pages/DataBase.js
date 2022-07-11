import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import { ReadOnlyRow } from '../components/tables/db/ReadOnlyRow';
import { EditableRow } from '../components/tables/db/EditableRow';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';

export const DataBase = () => {
  const { user } = useUserAuth(); // user is an object with email and password
  const [products, setProducts] = useState([]); // products array
  const [editFormData, setEditFormData] = useState([]); // form data to edit
  const [editProductId, setEditProductId] = useState(null); // id of the product to edit
  const URI = process.env.REACT_APP_API_URL; // database url
  const [name, setName] = useState(''); // name of the product
  const inputFocus = useRef(null); // input ref to focus on

  // Function to access the edit form
  const handleEditClick = (e, product) => {
    e.preventDefault();
    setEditProductId(product.id);

    const formValues = {
      id: product.id,
      mark: product.mark,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      ideal: product.ideal_quantity,
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
      description: editFormData.description,
      quantity: editFormData.quantity,
      ideal_quantity: editFormData.ideal,
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
    formData.append('action', 'saveProductDB');
    formData.append('id_product', editFormData.id);
    formData.append('mark', editFormData.mark);
    formData.append('name_product', editFormData.name);
    formData.append('description', editFormData.description);
    formData.append('quantity', editFormData.quantity);
    formData.append('ideal_quantity', editFormData.ideal);
    formData.append('date', editFormData.date);
    formData.append('serial_number', editFormData.code);

    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        if (response.data.status === false) {
          window.location.reload();
          alert('Producto actualizado');
        } else {
          alert('Error, no se pudo actualizar el producto');
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  // Function to delete a product
  const handleDelete = async (e, product) => {
    if (window.confirm('¿Seguro que desea borrar este producto?')) {
      let formData = new FormData();
      formData.append('action', 'deleteProductDB');
      formData.append('id_product', product.id);

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
    }
  };

  // POST API to find product
  const handleSubmit = async e => {
    inputFocus.current.select();

    var department = 0;

    if (user.email == 'sistemas@poscomppc.com') {
      department = 2;
    } else {
      department = 1;
    }

    e.preventDefault();

    let formData = new FormData();
    formData.append('action', 'addProduct');
    formData.append('id_department', department);
    formData.append('name_product', name);
    formData.append('mark', name);
    formData.append('serial_number', name);
    formData.append('description', name);

    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        if (response.data.status === false) {
          alert('Datos no encontrados');
        } else {
          setProducts(response.data);
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  // Clean state
  const handleClean = () => {
    setName('');
    setProducts([]);
  };

  return (
    <div className='component'>
      <Col className='mt-2 col-sm-11 mb-5'>
        <Card className='card-style-bitacora'>
          <Card.Header className='titleLogin'>Base de Datos</Card.Header>
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
                      <th>Descripción</th>
                      <th>Cantidad</th>
                      <th>Cantida Ideal</th>
                      <th>Última fecha de actualización</th>
                      <th>Código</th>
                      <th>Editar</th>
                      <th>Borrar</th>
                      <th>Guardar</th>
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
