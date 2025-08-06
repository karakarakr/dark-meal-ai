import { useState, useEffect } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider, Text } from '@mantine/core';
import axios from 'axios';
import HeaderSearch from './components/common/Header/HeaderSearch';
import { AppShell } from '@mantine/core';
import { Grid } from '@mantine/core';
import './App.css'
import GridMeals from './components/common/Grid/GridMeals';
import ItemMeal from './components/common/Grid/ItemMeal';

function App() {
  const [firstResponse, setFirstResponse] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => setFirstResponse(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <>
      <MantineProvider>
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
          <HeaderSearch/>
          <AppShell.Main>
            <GridMeals>
              <ItemMeal 
                title="TEST"
                shortDescription="Lorem ipsum dolor sit amet..."
                date="03.02.2005"
              />
              <ItemMeal 
                title="TEST"
                shortDescription="Lorem ipsum dolor sit amet..."
                date="03.02.2005"
              />
              <ItemMeal 
                title="TEST"
                shortDescription="Lorem ipsum dolor sit amet..."
                date="03.02.2005"
              />
              <ItemMeal 
                title="TEST"
                shortDescription="Lorem ipsum dolor sit amet..."
                date="03.02.2005"
              />
            </GridMeals>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  )
}

export default App
