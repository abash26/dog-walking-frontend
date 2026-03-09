import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useGetDogsQuery } from '../features/dogs/dogsApi';
import {
  useGetWalksQuery,
  useScheduleWalkMutation,
  useCancelWalkByOwnerMutation,
} from '../features/walks/walksApi';

export default function Walks() {
  const { data: dogs, isLoading: dogsLoading } = useGetDogsQuery();
  const { data: walks, isLoading: walksLoading } = useGetWalksQuery(undefined, {
    pollingInterval: 15000,
  });

  const [scheduleWalk] = useScheduleWalkMutation();
  const [cancelWalk] = useCancelWalkByOwnerMutation();

  const [form, setForm] = useState({
    dogId: '',
    startTime: '',
    duration: 30,
  });

  const handleRequest = async () => {
    if (!form.dogId || !form.startTime) {
      alert('Please select a dog and start time');
      return;
    }
    const hours = Math.floor(form.duration / 60);
    const minutes = form.duration % 60;
    const durationStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;

    try {
      await scheduleWalk({
        dogId: form.dogId,
        startTime: form.startTime,
        duration: durationStr,
      }).unwrap();

      setForm({ dogId: '', startTime: '', duration: 30 });
    } catch (err) {
      console.error(err);
      alert('Failed to schedule walk');
    }
  };

  if (dogsLoading || walksLoading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h4'>Request Walk</Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Select
          fullWidth
          value={form.dogId}
          onChange={(e) => setForm({ ...form, dogId: e.target.value })}
          displayEmpty
        >
          <MenuItem value=''>Select Dog</MenuItem>
          {dogs?.map((dog) => (
            <MenuItem key={dog.id} value={dog.id}>
              {dog.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          type='datetime-local'
          fullWidth
          sx={{ mt: 2 }}
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
        />

        <TextField
          label='Duration (minutes)'
          type='number'
          fullWidth
          sx={{ mt: 2 }}
          value={form.duration}
          onChange={(e) =>
            setForm({ ...form, duration: Number(e.target.value) })
          }
        />

        <Button
          variant='contained'
          sx={{ mt: 2 }}
          onClick={handleRequest}
          disabled={!form.dogId || !form.startTime}
        >
          Request Walk
        </Button>
      </Paper>

      <Typography variant='h5' sx={{ mt: 5 }}>
        My Walk Requests
      </Typography>

      {walks?.length === 0 && (
        <Typography sx={{ mt: 2 }}>No walks scheduled.</Typography>
      )}

      <List>
        {walks.map((walk) => {
          const statusMap = {
            0: 'Pending',
            1: 'Accepted',
            2: 'InProgress',
            3: 'Completed',
            4: 'Cancelled',
          };
          const statusText = statusMap[walk.status] || 'Unknown';

          return (
            <ListItem
              key={walk.id}
              secondaryAction={
                statusText === 'Pending' && (
                  <Button
                    color='error'
                    onClick={() => {
                      if (window.confirm('Cancel this walk?')) {
                        cancelWalk(walk.id);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                )
              }
            >
              <ListItemText
                primary={`Dog: ${walk.dogName || walk.dogId}`}
                secondary={
                  <>
                    {new Date(walk.startTime).toLocaleString()} <br />
                    Status: <strong>{statusText}</strong>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}
