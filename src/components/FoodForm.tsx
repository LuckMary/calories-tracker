import { Button, TextField } from '@mui/material';
import { useFoodStore } from '../store/store';
import { useState } from 'react';

export const FoodForm = () => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [nameError, setNameError] = useState('');
  const [caloriesError, setCaloriesError] = useState('');

  const { addFood } = useFoodStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setNameError('');
    setCaloriesError('');

    // Validate inputs
    let isValid = true;
    let caloriesNum = 0;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else if (name.length < 2 || name.length > 30) {
      setNameError('Name must be between 2-30 characters');
      isValid = false;
    }

    if (!calories.trim()) {
      setCaloriesError('Calories are required');
      isValid = false;
    } else {
      caloriesNum = parseInt(calories);
      if (isNaN(caloriesNum)) {
        setCaloriesError('Must be a valid number');
        isValid = false;
      } else if (caloriesNum < 1 || caloriesNum > 5000) {
        setCaloriesError('Calories must be between 1-5000');
        isValid = false;
      }
    }

    if (isValid) {
      await addFood(name, caloriesNum);
      setName('');
      setCalories('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Food Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!nameError}
        helperText={nameError}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Calories"
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        error={!!caloriesError}
        helperText={caloriesError}
        fullWidth
        margin="normal"
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Food
      </Button>
    </form>
  );
};