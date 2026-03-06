import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function WalkerDashboard() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h4' gutterBottom>
        Walker Dashboard
      </Typography>

      <Button
        component={Link}
        to='/available-walks'
        variant='contained'
        sx={{ mr: 2 }}
      >
        Available Walks
      </Button>
      <Button component={Link} to='/my-walks' variant='contained'>
        My Walks
      </Button>
    </Container>
  );
}
