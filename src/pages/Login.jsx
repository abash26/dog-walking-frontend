import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useLoginMutation, useLazyGetMeQuery } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [login, { isLoading, error }] = useLoginMutation();
  const [getMe] = useLazyGetMeQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: login and get token
      const { token } = await login(form).unwrap();
      dispatch(setToken(token));

      // Step 2: fetch user info using RTK Query
      const user = await getMe().unwrap();

      dispatch(setUser(user));

      // Step 3: redirect based on role
      if (user.role === 'Owner') navigate('/owner');
      else if (user.role === 'Walker') navigate('/walker');
      else navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Paper sx={{ p: 4, mt: 5 }}>
        <Typography variant='h5' gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            Login failed. Check your email and password.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Email'
            margin='normal'
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            margin='normal'
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            fullWidth
            variant='contained'
            type='submit'
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
