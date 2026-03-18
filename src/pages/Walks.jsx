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
  Pagination,
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

  const [page, setPage] = useState(1);

  const { data: walks, isLoading: walksLoading } = useGetWalksQuery(
    { page, pageSize: 10 },
    {
      pollingInterval: 15000,
    },
  );

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
    const durationStr = `${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;

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

      {walks?.items?.length === 0 && (
        <Typography sx={{ mt: 2 }}>No walks scheduled.</Typography>
      )}

      <List>
        {walks?.items?.map((walk) => {
          const prettyStatus = walk.status.replace('InProgress', 'In Progress');

          return (
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
                primary={`Dog: ${walk.dogName}`}
                secondary={
                  <>
                    {new Date(walk.startTime).toLocaleString()} <br />
                    Status: <strong>{prettyStatus}</strong>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>

      {walks && (
        <Pagination
          count={Math.ceil(walks.totalCount / walks.pageSize)}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{ mt: 3 }}
        />
      )}
    </Container>
  );
}
