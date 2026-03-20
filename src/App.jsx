import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dogs from './pages/Dogs';
import Walks from './pages/Walks';
import OwnerDashboard from './pages/OwnerDashboard';
import WalkerDashboard from './pages/WalkerDashboard';
import AvailableWalks from './pages/AvailableWalks';
import MyWalks from './pages/MyWalks';
import AppBreadcrumbs from './components/Breadcrumbs';

function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 3 }}>
        <AppBreadcrumbs />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* Owner Routes */}
          <Route
            path='/owner'
            element={
              <ProtectedRoute allowedRoles={['Owner']}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/dogs'
            element={
              <ProtectedRoute allowedRoles={['Owner']}>
                <Dogs />
              </ProtectedRoute>
            }
          />
          <Route
            path='/walks'
            element={
              <ProtectedRoute allowedRoles={['Owner']}>
                <Walks />
              </ProtectedRoute>
            }
          />

          {/* Walker Routes */}
          <Route
            path='/walker'
            element={
              <ProtectedRoute allowedRoles={['Walker']}>
                <WalkerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/available-walks'
            element={
              <ProtectedRoute allowedRoles={['Walker']}>
                <AvailableWalks />
              </ProtectedRoute>
            }
          />
          <Route
            path='/my-walks'
            element={
              <ProtectedRoute allowedRoles={['Walker']}>
                <MyWalks />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
