import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, role } = useSelector((state) => state.auth);

  const linkStyle = ({ isActive }) => ({
    color: 'inherit',
    textDecoration: 'none',
    borderBottom: isActive ? '2px solid white' : 'none',
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position='sticky' elevation={1}>
      <Toolbar>
        <PetsIcon sx={{ mr: 1 }} />
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          WalkApp
        </Typography>

        {token ? (
          <Stack direction='row' spacing={1} alignItems='center'>
            <Button
              component={NavLink}
              to={role === 'Owner' ? '/owner' : '/walker'}
              style={linkStyle}
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>

            {role === 'Owner' && (
              <>
                <Button
                  component={NavLink}
                  to='/dogs'
                  style={linkStyle}
                  startIcon={<PetsIcon />}
                >
                  Dogs
                </Button>

                <Button
                  component={NavLink}
                  to='/walks'
                  style={linkStyle}
                  startIcon={<ListAltIcon />}
                >
                  Requests
                </Button>
              </>
            )}

            {role === 'Walker' && (
              <>
                <Button
                  component={NavLink}
                  to='/available-walks'
                  style={linkStyle}
                  startIcon={<DirectionsWalkIcon />}
                >
                  Find Walks
                </Button>

                <Button
                  component={NavLink}
                  to='/my-walks'
                  style={linkStyle}
                  startIcon={<ListAltIcon />}
                >
                  My Walks
                </Button>
              </>
            )}

            <Button
              color='inherit'
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ ml: 1 }}
            >
              Logout
            </Button>
          </Stack>
        ) : (
          <Stack direction='row' spacing={1}>
            <Button component={NavLink} to='/login' style={linkStyle}>
              Login
            </Button>
            <Button component={NavLink} to='/register' style={linkStyle}>
              Register
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
