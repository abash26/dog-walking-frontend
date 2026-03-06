import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function OwnerDashboard() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h4' gutterBottom>
        Pet Owner Dashboard
      </Typography>

      <Button component={Link} to='/dogs' variant='contained' sx={{ mr: 2 }}>
        My Dogs
      </Button>

      <Button component={Link} to='/walks' variant='contained'>
        My Walks
      </Button>
    </Container>
  );
}
