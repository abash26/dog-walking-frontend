import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
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
    const { token } = await login(form).unwrap();
    dispatch(setToken(token));

    const user = await getMe().unwrap();
    dispatch(setUser(user));

    navigate(user.role === 'Owner' ? '/owner' : '/walker');
  };

  return (
    <Container maxWidth='sm'>
      <Paper sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant='h5' gutterBottom>
          Welcome back 👋
        </Typography>

        {error && <Alert severity='error'>Invalid credentials</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Email'
            margin='normal'
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            margin='normal'
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button fullWidth variant='contained' sx={{ mt: 2 }} type='submit'>
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
