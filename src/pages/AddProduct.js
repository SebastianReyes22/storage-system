import { useRef, useState } from 'react';
import Axios from 'axios';
import { useUserAuth } from '../context/UserAuthContext';
import { SystemsProducts } from '../components/addProduct/SystemsProducts';
import { AdminProducts } from '../components/addProduct/AdminProducts';

export const AddProduct = () => {
  const { user } = useUserAuth(); // user is an object with email and password

  const URI = process.env.REACT_APP_API_URL; // database url

  const [products, setProducts] = useState([]); // products array
  const [name, setName] = useState(''); // name of the product
  const date = new Date().toJSON().slice(0, 19).replace('T', ' '); // 2020-05-06T19:00:00

  const inputFocus = useRef(null); // input ref to focus on

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

  // POST API to add product
  const handleSave = async (e, product) => {
    let formData = new FormData();
    formData.append('action', 'saveProduct');
    formData.append('id_product', product.id);
    formData.append('date', date);

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

  // POST API to delete product
  const handleDelete = async (e, product) => {
    let formData = new FormData();
    formData.append('action', 'deleteProduct');
    formData.append('id_product', product.id);
    formData.append('date', date);

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

  // Clean state
  const handleClean = () => {
    setName('');
    setProducts([]);
  };

  const handleChange = (e, product) => {
    return product.quantity + 1;
  };

  return (
    <>
      {user.email == 'sistemas@poscomppc.com' ? (
        <SystemsProducts
          handleSubmit={handleSubmit}
          inputFocus={inputFocus}
          handleSave={handleSave}
          handleDelete={handleDelete}
          handleClean={handleClean}
          products={products}
          name={name}
          setName={setName}
        />
      ) : (
        <AdminProducts
          inputFocus={inputFocus}
          products={products}
          setProducts={setProducts}
          name={name}
          setName={setName}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleSave={handleSave}
          handleDelete={handleDelete}
          handleClean={handleClean}
        />
      )}
    </>
  );
};
