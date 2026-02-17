import { Container, Typography, Grid, Paper } from '@mui/material';

export default function Dashboard() {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6'>Manage Dogs</Typography>
            <Typography>Add, edit and remove dogs.</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6'>Schedule Walks</Typography>
            <Typography>Plan and track walks.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
