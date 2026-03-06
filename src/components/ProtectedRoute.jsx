import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) return <Navigate to='/login' />;

  if (!user) return null;

  console.log('ProtectedRoute - user role:', user.role);

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const fallbackPath =
      user.role === 'Owner'
        ? '/owner'
        : user.role === 'Walker'
          ? '/walker'
          : '/';
    return <Navigate to={fallbackPath} />;
  }

  return children;
}
