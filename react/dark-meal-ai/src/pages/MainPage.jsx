import React, { useEffect, useState } from 'react';
import GridMeals from '../components/common/Grid/GridMeals';
import ItemMeal from '../components/common/Grid/ItemMeal';
import { IconSearch } from '@tabler/icons-react';
import { Center, TextInput, Space, Button, Pagination } from '@mantine/core';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useDisclosure, usePagination } from '@mantine/hooks';
import AddRecipeModal from '../components/common/Modal/AddRecipeModal';

function MainPage() {
    const [recipes, setRecipes] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);
    const recipesPerPage = 5;
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
                        <Button onClick={open}>+ Add meal</Button>
                        <AddRecipeModal opened={opened} onClose={close} title="Authentication"/>  
                    </>
                )}
            </Center>
            <Space h="md"/>
            <Center>
                <Pagination 
                    total={10} 
                    value={0}
                    onChange={(value) => {
                        setPage(page + value);
                        alert(`changed: ${page}`);
                    }} 
                    withPages={false}
                />
            </Center>
            <Space h="md"/>
            <GridMeals>
                {recipes.map((recipe) => (
                    <ItemMeal 
                        key={recipe.id}
                        mealId={recipe.id}
                        title={recipe.title}
                        imageURL={recipe.imageURL}
                        description={recipe.content} 
                        date={recipe.createdAt}
                    />
                ))}
            </GridMeals>
        </>
  );
}

export default MainPage;