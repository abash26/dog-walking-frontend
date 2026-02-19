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

  // Form for adding a new dog
  const [newDog, setNewDog] = useState({
    name: '',
    breed: '',
    age: '',
    size: '',
    specialNeeds: '',
  });

  // For editing existing dog
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);

  // Create dog
  const handleCreate = async () => {
    if (!newDog.name || !newDog.age || !newDog.size) {
      alert('Please fill Name, Age, and Size');
      return;
    }
    await createDog({
      ...newDog,
      age: parseInt(newDog.age), // make sure age is number
    });
    setNewDog({ name: '', breed: '', age: '', size: '', specialNeeds: '' });
  };

  // Update dog
  const handleUpdate = async () => {
    await updateDog({
      id: selectedDog.id,
      ...selectedDog,
      age: parseInt(selectedDog.age),
    });
    setEditOpen(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h4'>My Dogs</Typography>

      {/* Add Dog Form */}
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
        <TextField
          label='Size'
          value={newDog.size}
          onChange={(e) => setNewDog({ ...newDog, size: e.target.value })}
          sx={{ mr: 2, mb: 1 }}
        />
        <TextField
          label='Special Needs'
          value={newDog.specialNeeds}
          onChange={(e) =>
            setNewDog({ ...newDog, specialNeeds: e.target.value })
          }
          sx={{ mr: 2, mb: 1 }}
        />
        <Button variant='contained' onClick={handleCreate} sx={{ mt: 1 }}>
          Add Dog
        </Button>
      </Paper>

      {/* List of Dogs */}
      <List>
        {dogs?.map((dog) => (
          <ListItem
            key={dog.id}
            secondaryAction={
              <>
                <IconButton
                  onClick={() => {
                    setSelectedDog({ ...dog }); // copy dog object
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
            <ListItemText
              primary={dog.name}
              secondary={`Breed: ${dog.breed || '-'}, Age: ${dog.age}, Size: ${dog.size}${
                dog.specialNeeds ? ', Needs: ' + dog.specialNeeds : ''
              }`}
            />
          </ListItem>
        ))}
      </List>

      {/* Edit Dog Dialog */}
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
          <TextField
            label='Size'
            value={selectedDog?.size || ''}
            onChange={(e) =>
              setSelectedDog({ ...selectedDog, size: e.target.value })
            }
          />
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
