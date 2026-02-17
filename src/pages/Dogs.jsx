import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

  const [name, setName] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);

  const handleCreate = async () => {
    await createDog({ name });
    setName('');
  };

  const handleUpdate = async () => {
    await updateDog({
      id: selectedDog.id,
      name: selectedDog.name,
    });
    setEditOpen(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h4'>My Dogs</Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <TextField
          label='Dog Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button sx={{ ml: 2 }} variant='contained' onClick={handleCreate}>
          Add Dog
        </Button>
      </Paper>

      <List>
        {dogs?.map((dog) => (
          <ListItem
            key={dog.id}
            secondaryAction={
              <>
                <IconButton
                  onClick={() => {
                    setSelectedDog(dog);
                    setEditOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteDog(dog.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={dog.name} />
          </ListItem>
        ))}
      </List>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Dog</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={selectedDog?.name || ''}
            onChange={(e) =>
              setSelectedDog({ ...selectedDog, name: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
