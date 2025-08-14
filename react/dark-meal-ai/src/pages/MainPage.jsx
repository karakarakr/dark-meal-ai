import React, { useEffect, useState } from 'react';
import GridMeals from '../components/common/Grid/GridMeals';
import ItemMeal from '../components/common/Grid/ItemMeal';
import { IconSearch } from '@tabler/icons-react';
import { Center, TextInput, Space, Button, Pagination } from '@mantine/core';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useDisclosure } from '@mantine/hooks';
import AddRecipeModal from '../components/common/Modal/AddRecipeModal';
import { stripHTMLandMarkdown } from '../utils/stripHTMLandMarkdown';

function MainPage() {
    const [recipes, setRecipes] = useState([]);
    const [count, setCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const [page, setPage] = useState(1);
    const auth = useAuth();
    const limit = 6;

    useEffect(() => {
        axios.get(
            `http://localhost:3000/recipes/chunk?page=${page}&limit=${limit}&q=${searchQuery}`
        )
            .then(response => setRecipes(
                    [...response.data]
                )
            )
            .catch(error => console.error('Error fetching tasks:', error));
   }, [opened, page, searchQuery]);

    useEffect(() => {
        axios.get(`http://localhost:3000/recipes/count?q=${searchQuery}`)
            .then(response => {
                setCount(response.data);
            })
            .catch(error => console.error('Error fetching tasks:', error));
        console.log('Changing page...');
    }, [opened, page, searchQuery]);

    const total = count;
    const totalPages = Math.ceil(total / limit);
    const items = recipes.map((recipe) => (
        <ItemMeal 
            key={recipe.id}
            mealId={recipe.id}
            title={recipe.title}
            imageURL={recipe.imageURL}
            description={stripHTMLandMarkdown(recipe.content)} 
            date={recipe.createdAt}
        />
    ));

    return (
        <>
            <Center>
                <TextInput
                    placeholder="Search meals..."
                    leftSection={<IconSearch size={16} />}
                    style={{ 
                        flexGrow: 1, 
                        maxWidth: 400 
                    }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {auth.user && (
                    <>
                        <Space w="md"/>
                        <Button onClick={open}>+ Add meal</Button>
                        <AddRecipeModal 
                            opened={opened} 
                            onClose={close} 
                            title="Authentication"
                        />  
                    </>
                )}
            </Center>
            <Space h="md"/>
            <Center>
                <Pagination 
                    total={totalPages} 
                    value={page}
                    onChange={(value) => {
                        setPage(value);
                    }} 
                />
            </Center>
            <Space h="md"/>
            <GridMeals>
                {items}
            </GridMeals>
        </>
  );
}

export default MainPage;