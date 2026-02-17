import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form).unwrap();
    dispatch(setCredentials(result.token));
    navigate('/');
  };

  return (
    <Container maxWidth='sm'>
      <Paper sx={{ p: 4, mt: 5 }}>
        <Typography variant='h5' gutterBottom>
          Login
        </Typography>
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
          <Button fullWidth variant='contained' type='submit' sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
