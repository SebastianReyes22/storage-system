import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { NavBar } from '../ui/NavBar';

export const Management = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const URI = process.env.REACT_APP_API_URL;
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
    getProducts();
  }, []);

  return (
    <>
      <NavBar />
      <div className='table-pd'>
        <h3 className='title-table text-center'>Inventario Administración</h3>
        <ReactHtmlTableToExcel
          id='btnExportExcel'
          className='btn btn-success mb-4 btn-lg'
          table='tableStorage'
          filename='Invetario'
          sheet='Hoja 1'
          buttonText='Descargar inventario'
        />
        <Table striped bordered hover id='tableStorage'>
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
