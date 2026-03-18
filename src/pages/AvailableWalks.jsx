import { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  useGetAvailableWalksQuery,
  useAcceptWalkMutation,
} from '../features/walks/walksApi';

export default function AvailableWalks() {
  const { data: walks, isLoading, refetch } = useGetAvailableWalksQuery();
  const [acceptWalk, { isLoading: isAccepting }] = useAcceptWalkMutation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleAccept = async (walkId) => {
    try {
      await acceptWalk(walkId).unwrap();
      setSnackbar({
        open: true,
        message: 'Walk accepted!',
        severity: 'success',
      });
      refetch();
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: 'Failed to accept walk',
        severity: 'error',
      });
    }
  };

  if (isLoading) {
    return <Typography sx={{ mt: 4 }}>Loading available walks...</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h4'>Available Walks</Typography>

      {walks?.length === 0 && (
        <Typography sx={{ mt: 3 }}>No walks available right now.</Typography>
      )}

      <List>
        {walks?.map((walk) => (
          <Paper key={walk.id} sx={{ mb: 2 }}>
            <ListItem
              secondaryAction={
                <Button
                  variant='contained'
                  disabled={isAccepting}
                  onClick={() => handleAccept(walk.id)}
                >
                  Accept
                </Button>
              }
            >
              <ListItemText
                primary={`Dog: ${walk.dogName}`}
                secondary={`Start: ${new Date(walk.startTime).toLocaleString()} | Duration: ${walk.duration} minutes`}
              />
            </ListItem>
          </Paper>
        ))}
      </List>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
