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
  Select,
  MenuItem,
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
  const { data: dogs, isLoading } = useGetDogsQuery();
  const [createDog] = useCreateDogMutation();
  const [deleteDog] = useDeleteDogMutation();
  const [updateDog] = useUpdateDogMutation();

  const [newDog, setNewDog] = useState({
    name: '',
    breed: '',
    age: '',
    size: '',
    specialNeeds: '',
  });

  const [editOpen, setEditOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);

  const handleCreate = async () => {
    if (!newDog.name || !newDog.age || !newDog.size) {
      alert('Please fill Name, Age, and Size');
      return;
    }
    await createDog({
      ...newDog,
      age: parseInt(newDog.age),
    });
    setNewDog({
      name: '',
      breed: '',
      age: '',
      size: '',
      specialNeeds: '',
    });
  };

  const handleUpdate = async () => {
    await updateDog({
      id: selectedDog.id,
      ...selectedDog,
      age: parseInt(selectedDog.age),
    });
    setEditOpen(false);
  };

  if (isLoading) return <Typography sx={{ mt: 4 }}>Loading dogs...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h4'>My Dogs</Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <TextField
          label='Name'
          value={newDog.name}
          onChange={(e) => setNewDog({ ...newDog, name: e.target.value })}
          sx={{ mr: 2, mb: 1 }}
        />

        <TextField
          label='Breed'
          value={newDog.breed}
          onChange={(e) => setNewDog({ ...newDog, breed: e.target.value })}
          sx={{ mr: 2, mb: 1 }}
        />

        <TextField
          label='Age'
          type='number'
          value={newDog.age}
          onChange={(e) => setNewDog({ ...newDog, age: e.target.value })}
          sx={{ mr: 2, mb: 1 }}
        />

        <Select
          value={newDog.size}
          onChange={(e) => setNewDog({ ...newDog, size: e.target.value })}
          displayEmpty
          sx={{ mr: 2, mb: 1, minWidth: 120 }}
        >
          <MenuItem value=''>Size</MenuItem>
          <MenuItem value='Small'>Small</MenuItem>
          <MenuItem value='Medium'>Medium</MenuItem>
          <MenuItem value='Large'>Large</MenuItem>
        </Select>

        <TextField
          label='Special Needs'
          value={newDog.specialNeeds}
          onChange={(e) =>
            setNewDog({ ...newDog, specialNeeds: e.target.value })
          }
          sx={{ mr: 2, mb: 1 }}
        />

        <Button variant='contained' onClick={handleCreate}>
          Add Dog
        </Button>
      </Paper>

      {dogs?.length === 0 && (
        <Typography sx={{ mt: 3 }}>No dogs added yet.</Typography>
      )}

      <List>
        {dogs?.map((dog) => (
          <ListItem
            key={dog.id}
            secondaryAction={
              <>
                <IconButton
                  onClick={() => {
                    setSelectedDog({ ...dog });
                    setEditOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  onClick={() => {
                    if (window.confirm('Delete this dog?')) {
                      deleteDog(dog.id);
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={dog.name}
              secondary={`Breed: ${dog.breed || '-'}, Age: ${dog.age}, Size: ${
                dog.size
              }${dog.specialNeeds ? ', Needs: ' + dog.specialNeeds : ''}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Dog</DialogTitle>

        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label='Name'
            value={selectedDog?.name || ''}
            onChange={(e) =>
              setSelectedDog({ ...selectedDog, name: e.target.value })
            }
          />

          <TextField
            label='Breed'
            value={selectedDog?.breed || ''}
            onChange={(e) =>
              setSelectedDog({ ...selectedDog, breed: e.target.value })
            }
          />

          <TextField
            label='Age'
            type='number'
            value={selectedDog?.age || ''}
            onChange={(e) =>
              setSelectedDog({ ...selectedDog, age: e.target.value })
            }
          />

          <Select
            value={selectedDog?.size || ''}
            onChange={(e) =>
              setSelectedDog({ ...selectedDog, size: e.target.value })
            }
          >
            <MenuItem value='Small'>Small</MenuItem>
            <MenuItem value='Medium'>Medium</MenuItem>
            <MenuItem value='Large'>Large</MenuItem>
          </Select>

          <TextField
            label='Special Needs'
            value={selectedDog?.specialNeeds || ''}
            onChange={(e) =>
              setSelectedDog({ ...selectedDog, specialNeeds: e.target.value })
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
