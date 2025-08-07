import React, { useEffect, useState } from 'react';
import GridMeals from '../components/common/Grid/GridMeals';
import ItemMeal from '../components/common/Grid/ItemMeal';
import { IconSearch } from '@tabler/icons-react';
import { Center, TextInput, Space, Button } from '@mantine/core';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function MainPage() {
    const [recipes, setRecipes] = useState([]);
    const auth = useAuth();
    
    useEffect(() => {
      axios.get('http://localhost:3000/recipes')
        .then(response => setRecipes([...response.data]))
        .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    console.log(JSON.stringify(auth.user));

    return (
        <>
            <Center>
                <TextInput
                    placeholder="Search meals..."
                    leftSection={<IconSearch size={16} />}
                    style={{ flexGrow: 1, maxWidth: 400 }}
                />
                {auth.user && (
                    <>
                        <Space w="md"/>
                        <Button>+ Add meal</Button>
                    </>
                )}
            </Center>
            <Space h="md"/>
            <GridMeals>
                {recipes.map((recipe) => (
                <ItemMeal 
                    key={recipe.id}
                    mealId={recipe.id}
                    title={recipe.title}
                    shortDescription={recipe.content.slice(0, 20) + '...'} 
                    date={recipe.createdAt}
                />
                ))}
            </GridMeals>
        </>
  );
}

export default MainPage;