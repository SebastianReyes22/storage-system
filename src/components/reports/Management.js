import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { NavBar } from '../ui/NavBar';

export const Management = () => {
  const URI = process.env.REACT_APP_API_URL;

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let formData = new FormData();
    formData.append('action', 'getProducts');

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavBar />
      <div className='table-pd'>
        <Table striped bordered hover id='tableInfoUsers'>
          <thead>
            <tr>
              <th>#</th>
              <th>Marca</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Última fecha de actualización</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.mark}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>{product.date}</td>
                  <td>{product.serial_number}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
