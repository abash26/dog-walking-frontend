import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

import {
  useGetDogsQuery,
  useCreateDogMutation,
  useDeleteDogMutation,
  useUpdateDogMutation,
} from '../features/dogs/dogsApi';

export default function Dogs() {
  const { data: dogs } = useGetDogsQuery();

  const [createDog] = useCreateDogMutation();
  const [deleteDog] = useDeleteDogMutation();
  const [updateDog] = useUpdateDogMutation();

  const [open, setOpen] = useState(false);
  const [editDog, setEditDog] = useState(null);

  const [form, setForm] = useState({
    name: '',
    breed: '',
    age: '',
    size: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCreate = async () => {
    if (!form.name || !form.age || !form.size) {
      setSnackbar({
        open: true,
        message: 'Please fill required fields',
        severity: 'error',
      });
      return;
    }

    await createDog({
      ...form,
      age: Number(form.age),
    });

    setForm({ name: '', breed: '', age: '', size: '' });
    setOpen(false);

    setSnackbar({
      open: true,
      message: 'Dog added 🐾',
      severity: 'success',
    });
  };

  const handleUpdate = async () => {
    if (!editDog.name || !editDog.age || !editDog.size) return;

    await updateDog({
      ...editDog,
      age: Number(editDog.age),
    });

    setEditDog(null);

    setSnackbar({
      open: true,
      message: 'Dog updated ✏️',
      severity: 'success',
    });
  };

  const handleDelete = async (id) => {
    await deleteDog(id);

    setSnackbar({
      open: true,
      message: 'Dog removed 🗑',
      severity: 'success',
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h4'>My Dogs 🐶</Typography>

      <Button variant='contained' sx={{ mt: 2 }} onClick={() => setOpen(true)}>
        + Add Dog
      </Button>

      {!dogs?.length && (
        <Typography sx={{ mt: 4 }}>No dogs yet — add your first 🐾</Typography>
      )}

      <Stack spacing={2} sx={{ mt: 3 }}>
        {dogs?.map((dog) => (
          <Card key={dog.id} sx={{ borderRadius: 3 }}>
            <CardContent
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div>
                <Typography variant='h6'>{dog.name}</Typography>
                <Typography color='text.secondary'>
                  {dog.breed || 'Unknown'} • {dog.age} yrs • {dog.size}
                </Typography>
              </div>

              <div>
                <IconButton onClick={() => setEditDog({ ...dog })}>
                  <EditIcon />
                </IconButton>

                <IconButton onClick={() => handleDelete(dog.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Dog</DialogTitle>

        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label='Name'
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            label='Breed'
            value={form.breed}
            onChange={(e) => setForm({ ...form, breed: e.target.value })}
          />

          <TextField
            label='Age'
            type='number'
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />

          <Select
            value={form.size}
            displayEmpty
            onChange={(e) => setForm({ ...form, size: e.target.value })}
          >
            <MenuItem value=''>Select size</MenuItem>
            <MenuItem value='Small'>Small</MenuItem>
            <MenuItem value='Medium'>Medium</MenuItem>
            <MenuItem value='Large'>Large</MenuItem>
          </Select>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleCreate}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!editDog} onClose={() => setEditDog(null)}>
        <DialogTitle>Edit Dog</DialogTitle>

        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label='Name'
            value={editDog?.name || ''}
            onChange={(e) => setEditDog({ ...editDog, name: e.target.value })}
          />

          <TextField
            label='Breed'
            value={editDog?.breed || ''}
            onChange={(e) => setEditDog({ ...editDog, breed: e.target.value })}
          />

          <TextField
            label='Age'
            type='number'
            value={editDog?.age || ''}
            onChange={(e) => setEditDog({ ...editDog, age: e.target.value })}
          />

          <Select
            value={editDog?.size || ''}
            onChange={(e) => setEditDog({ ...editDog, size: e.target.value })}
          >
            <MenuItem value='Small'>Small</MenuItem>
            <MenuItem value='Medium'>Medium</MenuItem>
            <MenuItem value='Large'>Large</MenuItem>
          </Select>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditDog(null)}>Cancel</Button>
          <Button variant='contained' onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
