import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { useRegisterMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const result = await register({
        email: form.email,
        password: form.password,
      }).unwrap();

      dispatch(setCredentials(result.token));
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Paper sx={{ p: 4, mt: 5 }}>
        <Typography variant='h5' gutterBottom>
          Create Account
        </Typography>

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            Registration failed. User may already exist.
          </Alert>
        )}

        <Box component='form' onSubmit={handleSubmit}>
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

          <TextField
            fullWidth
            label='Confirm Password'
            type='password'
            margin='normal'
            required
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          <Button
            fullWidth
            variant='contained'
            type='submit'
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }}>
          Already have an account? <Link to='/login'>Login here</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
