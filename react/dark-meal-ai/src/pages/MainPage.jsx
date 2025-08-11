import React, { useEffect, useMemo, useState } from 'react';
import GridMeals from '../components/common/Grid/GridMeals';
import ItemMeal from '../components/common/Grid/ItemMeal';
import { IconSearch } from '@tabler/icons-react';
import { Center, TextInput, Space, Button, Pagination } from '@mantine/core';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useDisclosure } from '@mantine/hooks';
import AddRecipeModal from '../components/common/Modal/AddRecipeModal';

function chunkData(array, size) {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunkData(tail, size)];
}

function MainPage() {
    const [recipes, setRecipes] = useState([]);
    const [count, setCount] = useState(0);
    const [opened, { open, close }] = useDisclosure(false);
    const [page, setPage] = useState(1);
    const auth = useAuth();
    const limit = 6;

    // 
    // ДОРОБИТИ МЕХАНІЗМ БЕКЕНД ПАГІНАЦІЇ
    // 

    useEffect(() => {
      axios.get(`http://localhost:3000/recipes/chunk/${page+((page-1)*limit)}/${page+(page*limit)}`)
        .then(response => setRecipes(
                [...response.data]
            )
        )
        .catch(error => console.error('Error fetching tasks:', error));
    }, [opened, page]);

    useEffect(() => {
        axios.get('http://localhost:3000/recipes/count')
            .then(response => {
                console.log(response.data);
                setCount(response.data);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, [opened, page]);

    const total = recipes.length;
    const totalPages = Math.ceil(total / limit);
    console.log(JSON.stringify(recipes));
    const chunkedRecipes = chunkData(recipes, limit);
    console.log(`ARRAY HERE: ${Array.from(chunkedRecipes)}`);
    
    const items = (chunkedRecipes[page - 1] || []).map((recipe) => (
        <ItemMeal 
            key={recipe.id}
            mealId={recipe.id}
            title={recipe.title}
            imageURL={recipe.imageURL}
            description={recipe.content} 
            date={recipe.createdAt}
        />
    ));
    console.log(`CHUNKED DATA: ${JSON.stringify(chunkedRecipes[page - 1], NaN, 2)}`);
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