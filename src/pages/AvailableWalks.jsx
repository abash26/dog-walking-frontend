import { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
  Box,
  CircularProgress,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import {
  useGetAvailableWalksQuery,
  useAcceptWalkMutation,
} from '../features/walks/walksApi';

export default function AvailableWalks() {
  const { data: walks, isLoading, refetch } = useGetAvailableWalksQuery();
  const [acceptWalk] = useAcceptWalkMutation();

  const [loadingId, setLoadingId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleAccept = async (id) => {
    setLoadingId(id);
    try {
      await acceptWalk(id).unwrap();
      setSnackbar({
        open: true,
        message: 'Walk accepted 🐾',
        severity: 'success',
      });
      refetch();
    } catch {
      setSnackbar({
        open: true,
        message: 'Failed to accept walk',
        severity: 'error',
      });
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ mt: 6, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading walks...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h4' gutterBottom>
        Available Walks 🐕
      </Typography>

      {!walks?.length && (
        <Box textAlign='center' sx={{ mt: 6 }}>
          <Typography variant='h6'>No walks right now 💤</Typography>
          <Typography color='text.secondary'>Check again soon</Typography>
        </Box>
      )}

      {walks?.map((walk) => (
        <Card key={walk.id} sx={{ mb: 2, borderRadius: 3 }}>
          <CardContent>
            <Typography variant='h6'>
              <PetsIcon sx={{ mr: 1 }} />
              {walk.dogName}
            </Typography>

            <Stack direction='row' spacing={1} sx={{ mt: 2 }}>
              <Chip
                icon={<AccessTimeIcon />}
                label={new Date(walk.startTime).toLocaleString()}
              />
              <Chip label={`${walk.duration} min`} />
            </Stack>
          </CardContent>

          <CardActions>
            <Button
              variant='contained'
              fullWidth
              disabled={loadingId === walk.id}
              onClick={() => handleAccept(walk.id)}
            >
              {loadingId === walk.id ? 'Accepting...' : 'Accept Walk'}
            </Button>
          </CardActions>
        </Card>
      ))}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}
