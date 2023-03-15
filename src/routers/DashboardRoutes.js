import { Routes, Route } from 'react-router-dom';
import { AddProduct } from '../components/reports/AddProduct';
import { Management } from '../components/reports/Management';
import { NewProduct } from '../components/reports/NewProduct';
import { Reports } from '../components/reports/Reports';
import { Systems } from '../components/reports/Systems';
import { NavBar } from '../components/ui/NavBar';

export const DashboardRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='index' element={<Reports />} />
        <Route path='admin' element={<Management />} />
        <Route path='sistemas' element={<Systems />} />
        <Route path='add-product' element={<AddProduct />} />
        <Route path='new-product' element={<NewProduct />} />
      </Routes>
    </>
  );
};
