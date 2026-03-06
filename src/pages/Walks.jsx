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
  useCancelWalkMutation,
} from '../features/walks/walksApi';
import { useGetMeQuery } from '../features/auth/authApi';

export default function Walks() {
  const { data: dogs, isLoading: dogsLoading } = useGetDogsQuery();
  const { data: walks, isLoading: walksLoading } = useGetWalksQuery();
  const { data: user, isLoading: userLoading } = useGetMeQuery();

  const [scheduleWalk] = useScheduleWalkMutation();
  const [cancelWalk] = useCancelWalkMutation();

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

    try {
      await scheduleWalk({
        dogId: form.dogId,
        duration: Number(form.duration),
        startTime: form.startTime,
      }).unwrap();

      setForm({ dogId: '', startTime: '', duration: 30 });
    } catch (err) {
      console.error(err);
      alert('Failed to schedule walk');
    }
  };

  if (dogsLoading || walksLoading || userLoading) {
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

      {walks?.filter((w) => w.ownerId === user?.id).length === 0 && (
        <Typography sx={{ mt: 2 }}>No walks scheduled.</Typography>
      )}

      <List>
        {walks
          ?.filter((w) => w.ownerId === user?.id)
          .map((walk) => (
            <ListItem
              key={walk.id}
              secondaryAction={
                walk.status === 'Pending' && (
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
                primary={`Dog: ${dogs.find((d) => d.id === walk.dogId)?.name || walk.dogId}`}
                secondary={`${new Date(walk.startTime).toLocaleString()} - ${
                  walk.status
                }`}
              />
            </ListItem>
          ))}
      </List>
    </Container>
  );
}
