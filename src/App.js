import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import { NavBar } from './components/ui/NavBar';
import { Login } from './pages/Login';
import { Systems } from './pages/Systems';
import { Management } from './pages/Management';
import { AddProduct } from './pages/AddProduct';
import { DeleteProduct } from './pages/DeleteProduct';
import { NewProduct } from './pages/NewProduct';
import { PageNotFound } from './pages/PageNotFound';
import { DataBase } from './pages/DataBase';

function App() {
  return (
    <BrowserRouter basename='/sistema-inventario'>
      <UserAuthContextProvider>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route
            path='/sistemas'
            element={
              <ProtectedRoute>
                <NavBar />
                <Systems />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <NavBar />
                <Management />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-product'
            element={
              <ProtectedRoute>
                <NavBar />
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path='/delete-product'
            element={
              <ProtectedRoute>
                <NavBar />
                <DeleteProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path='/new-product'
            element={
              <ProtectedRoute>
                <NavBar />
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <NavBar />
                <DataBase />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
