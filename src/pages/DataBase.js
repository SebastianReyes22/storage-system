import React, { useEffect, useState } from 'react';
import { Card, Col, Table } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import { ReadOnlyRow } from '../components/tables/ReadOnlyRow';
import { EditableRow } from '../components/tables/EditableRow';
import Axios from 'axios';

export const DataBase = () => {
  const { user } = useUserAuth();
  const [products, setProducts] = useState([]);
  const [editFormData, setEditFormData] = useState([]);
  const [editProductId, setEditProductId] = useState(null);

  const handleEditClick = (e, product) => {
    e.preventDefault();
    setEditProductId(product.id);

    const formValues = {
      id: product.id,
      mark: product.mark,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      ideal_quantity: product.ideal_quantity,
      date: product.date,
      serial_number: product.serial_number,
    };
    setEditFormData(formValues);
  };

  const handleEditFormChange = e => {
    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = e => {
    e.preventDefault();

    const editedProduct = {
      id: editFormData.id,
      mark: editFormData.mark,
      name: editFormData.name,
      description: editFormData.description,
      quantity: editFormData.quantity,
      ideal_quantity: editFormData.ideal_quantity,
      date: editFormData.date,
      serial_number: editFormData.serial_number,
    };

    const newProduct = [...products];
    const index = newProduct.findIndex(
      products => products.id === editedProduct.id,
    );
    newProduct[index] = editedProduct;
    setProducts(newProduct);
    setEditProductId(null);
  };

  // Get products
  useEffect(() => {
    const URI = process.env.REACT_APP_API_URL;
    const getProducts = async () => {
      let formData = new FormData();
      formData.append('action', 'getProducts');
      formData.append('id_department', '2');

      await Axios({
        method: 'POST',
        url: URI,
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.log(error, 'error');
        });
    };
    getProducts();
  }, []);

  return (
    <>
      {user.email == 'sistemas@poscomppc.com' ? (
        <div className='component'>
          <Col className='mt-2 col-sm-11 mb-5'>
            <Card className='card-style-bitacora'>
              <Card.Header className='titleLogin'>Base de Datos</Card.Header>
              <Card.Body>
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
                              />
                            )}
                          </>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </div>
      ) : (
        <div className='component'>
          <Col className='mt-2 col-sm-11 mb-5'>
            <Card className='card-style-bitacora'>
              <Card.Header className='titleLogin'>Permiso denegado</Card.Header>
            </Card>
          </Col>
        </div>
      )}
    </>
  );
};
