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
  const { data: dogs } = useGetDogsQuery();
  const { data: walks } = useGetWalksQuery();
  const { data: user } = useGetMeQuery();

  const [scheduleWalk] = useScheduleWalkMutation();
  const [cancelWalk] = useCancelWalkMutation();

  const [form, setForm] = useState({
    dogId: '',
    startTime: '',
    duration: 30,
  });

  const handleRequest = async () => {
    await scheduleWalk({
      dogId: form.dogId,
      ownerId: user.id,
      walkerId: 1, // can be assigned later
      duration: form.duration,
      startTime: form.startTime,
    });
  };

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
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
        />

        <Button variant='contained' sx={{ mt: 2 }} onClick={handleRequest}>
          Request Walk
        </Button>
      </Paper>

      <Typography variant='h5' sx={{ mt: 5 }}>
        My Walk Requests
      </Typography>

      <List>
        {walks
          ?.filter((w) => w.ownerId === user?.id)
          .map((walk) => (
            <ListItem
              key={walk.id}
              secondaryAction={
                walk.status === 'Scheduled' && (
                  <Button color='error' onClick={() => cancelWalk(walk.id)}>
                    Cancel
                  </Button>
                )
              }
            >
              <ListItemText
                primary={`Dog ID: ${walk.dogId}`}
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
