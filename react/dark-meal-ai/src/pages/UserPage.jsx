import { Avatar, Center, Container, Group, Pagination, Space, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GridMeals from '../components/common/Grid/GridMeals';
import ItemMeal from '../components/common/Grid/ItemMeal';
import axios from 'axios';
import { stripHTMLandMarkdown } from '../utils/stripHTMLandMarkdown';

export function UserPage() {
    const [userData, setUserData] = useState({});
    const [recipes, setRecipes] = useState([]);
    const [count, setCount] = useState(0);
    const { id } = useParams();
    const exampleAvatar = 'https://example.com/avatar.jpg';
    const [page, setPage] = useState(1);
    const limit = 6;

    useEffect(() => {
        axios.get(
            `http://localhost:3000/users/${id}`
        )
            .then(response => {
                setUserData(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch(error => console.error(`Error occured: ${error}`));
    }, []);

    useEffect(() => {
        axios.get(
            `http://localhost:3000/recipes/chunk?page=${page}&limit=${limit}&userId=${id}`
        )
            .then(response => {
                setRecipes([...response.data]);
                console.log(JSON.stringify(response.data));
            })
            .catch(error => console.error(`Error occured: ${error}`));
    }, [page]);

    useEffect(() => {
        // const recipesByUser = await axios.get();

        axios.get(`http://localhost:3000/recipes/count?userId=${id}`)
            .then(response => {
                setCount(response.data);
            })
            .catch(error => console.error('Error fetching tasks:', error));
        console.log('Changing page...');
    }, [page]);

    console.log(JSON.stringify(recipes));

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
        <Container size="lg" py="xl">
        <Stack spacing="xl">
            {/* User Profile Section */}
            <Group spacing="md">
                <Avatar src={exampleAvatar} alt={userData.email} size="xl" radius="xl" />
                <Stack spacing="xs">
                    <Title order={2}>USER</Title>
                    <Text color="dimmed">{userData.email}</Text>
                </Stack>
            </Group>

            {/* Recent Recipe Posts Section */}
            <Title order={3}>Last posts about recipes</Title>
            <Center>
                <Pagination 
                    total={totalPages} 
                    value={page}
                    onChange={(value) => {
                        setPage(value);
                    }} 
                />
            </Center>
            <GridMeals>
                {items}
            </GridMeals>
        </Stack>
        </Container>
    );
}