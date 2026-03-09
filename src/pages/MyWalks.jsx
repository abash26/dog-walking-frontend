import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  useGetWalksByWalkerQuery,
  useAcceptWalkMutation,
  useStartWalkMutation,
  useCompleteWalkMutation,
  useCancelWalkByWalkerMutation,
} from '../features/walks/walksApi';

export default function MyWalks() {
  const { data: walks, isLoading } = useGetWalksByWalkerQuery();
  const [acceptWalk] = useAcceptWalkMutation();
  const [startWalk] = useStartWalkMutation();
  const [completeWalk] = useCompleteWalkMutation();
  const [cancelWalk] = useCancelWalkByWalkerMutation();

  if (isLoading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading your walks...</Typography>
      </Container>
    );
  }

  if (!walks || walks.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>No walks assigned yet.</Typography>
      </Container>
    );
  }

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'Pending':
        return '⏳ Pending';
      case 'Accepted':
        return '✅ Accepted';
      case 'InProgress':
        return '🚶 In Progress';
      case 'Completed':
        return '🏁 Completed';
      case 'Cancelled':
        return '❌ Cancelled';
      default:
        return status;
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h4' gutterBottom>
        My Walks
      </Typography>

      <List>
        {walks.map((walk) => (
          <Paper key={walk.id} sx={{ mb: 2, p: 1 }}>
            <ListItem
              secondaryAction={
                <>
                  {walk.status === 'Pending' && (
                    <Button
                      variant='contained'
                      onClick={() => acceptWalk(walk.id)}
                      sx={{ mr: 1 }}
                    >
                      Accept
                    </Button>
                  )}
                  {walk.status === 'Accepted' && (
                    <Button
                      variant='contained'
                      onClick={() => startWalk(walk.id)}
                      sx={{ mr: 1 }}
                    >
                      Start
                    </Button>
                  )}
                  {walk.status === 'InProgress' && (
                    <Button
                      variant='contained'
                      color='success'
                      onClick={() => completeWalk(walk.id)}
                      sx={{ mr: 1 }}
                    >
                      Complete
                    </Button>
                  )}
                  {(walk.status === 'Pending' ||
                    walk.status === 'Accepted') && (
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => cancelWalk(walk.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </>
              }
            >
              <ListItemText
                primary={`Dog: ${walk.dogName}`}
                secondary={`Start: ${new Date(
                  walk.startTime,
                ).toLocaleString()} | Duration: ${walk.duration} min | Status: ${getStatusDisplay(
                  walk.status,
                )}`}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
}
