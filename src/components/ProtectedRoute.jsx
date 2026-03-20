import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) return <Navigate to='/login' />;

  if (!user) {
    return (
      <Box textAlign='center' sx={{ mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'Owner' ? '/owner' : '/walker'} />;
  }

  return children;
}
