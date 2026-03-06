import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
} from '@mui/material';
import {
  useGetAvailableWalksQuery,
  useAcceptWalkMutation,
} from '../features/walks/walksApi';

export default function AvailableWalks() {
  const { data: walks, isLoading } = useGetAvailableWalksQuery();
  const [acceptWalk] = useAcceptWalkMutation();

  if (isLoading)
    return <Typography sx={{ mt: 4 }}>Loading available walks...</Typography>;

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
                <Button variant='contained' onClick={() => acceptWalk(walk.id)}>
                  Accept
                </Button>
              }
            >
              <ListItemText
                primary={`Dog: ${walk.dogName}`}
                secondary={`Start: ${new Date(
                  walk.startTime,
                ).toLocaleString()} | Duration: ${walk.duration} minutes`}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
}
