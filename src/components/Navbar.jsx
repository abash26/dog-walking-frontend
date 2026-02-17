import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          🐶 Dog Walking Service
        </Typography>

        {token ? (
          <>
            <Button color='inherit' component={Link} to='/'>
              Dashboard
            </Button>
            <Button color='inherit' component={Link} to='/dogs'>
              Dogs
            </Button>
            <Button color='inherit' component={Link} to='/walks'>
              Walks
            </Button>
            <Button
              color='inherit'
              onClick={() => {
                dispatch(logout());
                navigate('/login');
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
            <Button color='inherit' component={Link} to='/register'>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
