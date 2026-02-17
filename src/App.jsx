import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Dogs from './pages/Dogs';
import Walks from './pages/Walks';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/dogs'
          element={
            <ProtectedRoute>
              <Dogs />
            </ProtectedRoute>
          }
        />
        <Route
          path='/walks'
          element={
            <ProtectedRoute>
              <Walks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
