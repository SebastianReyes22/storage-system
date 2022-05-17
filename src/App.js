import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/login/Login';
import { AddProduct } from './components/reports/AddProduct';
import { Management } from './components/reports/Management';
import { NewProduct } from './components/reports/NewProduct';
import { Reports } from './components/reports/Reports';
import { Systems } from './components/reports/Systems';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/index' element={<Reports />} />
        <Route path='/admin' element={<Management />} />
        <Route path='/sistemas' element={<Systems />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/new-product' element={<NewProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
