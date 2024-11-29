import { FoodForm } from './components/FoodForm';
import { FoodList } from './components/FoodList';
import { Container, Typography } from '@mui/material';
import { useFoodStore } from './store/store';
import { useEffect } from 'react';

function App() {
  const { initDatabase, fetchFoods } = useFoodStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initDatabase();
        await fetchFoods();
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };
    initializeApp();
  }, [initDatabase, fetchFoods]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Calorie Tracker
      </Typography>
      <FoodForm />
      <FoodList />
    </Container>
  );
}

export default App;
