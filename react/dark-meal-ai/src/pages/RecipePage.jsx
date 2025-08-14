import {
    Container,
    Image,
    Text,
    Title,
    Textarea,
    Button,
    Group,
    Box,
    Divider,
    Avatar,
    Stack,
    Paper,
    List,
    Flex,
    Space,
    Badge,
} from '@mantine/core';
import axios from 'axios';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDisclosure } from '@mantine/hooks';
import ChangeRecipeModal from '../components/common/Modal/ChangeRecipeModal';

export default function RecipePage() {
    const { id } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({});
    const [author, setAuthor] = useState({});
    const [opened, { open, close }] = useDisclosure(false);
    const token = localStorage.getItem('accessToken');

    const getDifficultyColor = (level) => {
        switch (level) {
            case 'Easy':
                return 'green';
            case 'Medium':
                return 'yellow';
            case 'Hard':
                return 'red';
            default:
                return 'gray';
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/recipes/${id}`)
            .then(response => {   
                setRecipe(response.data);
            })
            .catch(error => console.error('Error fetching recipe:', error));
    }, [id]);

    useEffect(() => {
        if (recipe.authorId) {
            axios.get(`http://localhost:3000/users/${recipe.authorId}`)
                .then(response => setAuthor(response.data))
                .catch(error => console.error('Error retrieving author:', error));
        }
    }, [recipe.authorId]);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const newCommentObj = {
            id: Date.now(),
            author: 'CurrentUser',
            avatar: 'https://i.pravatar.cc/100?img=3',
            text: newComment,
        };
        setComments((prev) => [newCommentObj, ...prev]);
        setNewComment('');
    };

    const deleteMeal = () => {
        axios.delete(`http://localhost:3000/recipes/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => navigate('/'))
        .catch(error => console.error(error));
    };

    return (
        <Container size="md" py="xl">
            {/* Image */}
            <Box mb="md">
                <Image
                    src={recipe.imageURL || "https://res.cloudinary.com/ddkwopn8u/image/upload/v1755092431/qql62pjlj5szyv5pqoe8.png"}
                    radius={10}
                    alt="Recipe"
                    style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
                />
            </Box>

            {/* Title, Difficulty, Cooking Time */}
            <Box mb="xl">
                <Title order={1} mb="sm">{recipe.title}</Title>
                <Group spacing="sm" mb="sm">
                    {recipe.difficulty && (
                        <Badge color={getDifficultyColor(recipe.difficulty)} variant="filled">
                            {recipe.difficulty}
                        </Badge>
                    )}
                    {recipe.cookingTime && (
                        <Text size="sm" c="dimmed">
                            {recipe.cookingTime.hours}h {recipe.cookingTime.minutes}m
                        </Text>
                    )}
                </Group>

                {/* Content */}
                <Text mb="sm">
                    <MarkdownPreview source={recipe.content} style={{ background: 'none', textAlign: 'left', width: '100%' }} />
                </Text>

                <Divider my="md" />

                {/* Ingredients */}
                <Title order={2} mb="sm" style={{ textAlign: 'left' }}>Ingredients</Title>
                <List mb="sm" style={{ textAlign: 'left' }}>
                    {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                        <List.Item key={index}>
                            {ingredient.name}: {ingredient.quantity}{ingredient.unit}
                        </List.Item>
                    ))}
                </List>

                <Flex justify="space-between" mt="lg" w="100%">
                    <Text size="sm" italic>
                        Created at: {recipe.createdAt}
                    </Text>
                    <Text size="sm" italic>
                        Author email: <Link to={`/user/${recipe.authorId}`}>{author.email}</Link>
                    </Text>
                </Flex>

                {auth.user && auth.user.id === author.id && (
                    <>
                        <Space h="md"/>
                        <Group>
                            <Button onClick={open}>Edit meal</Button>
                            <Button color="red" onClick={deleteMeal}>Delete meal</Button>
                            <ChangeRecipeModal opened={opened} onClose={close} existingData={recipe} id={id} />
                        </Group>
                    </>
                )}
            </Box>

            {/* Comments */}
            <Divider my="lg" />
            <Box mb="xl">
                <Textarea
                    placeholder="Write your comment..."
                    autosize
                    minRows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.currentTarget.value)}
                />
                <Button mt="sm" onClick={handleAddComment}>Add Comment</Button>
            </Box>

            <Divider my="lg" />
            <Stack>
                {comments.map((comment) => (
                    <Paper key={comment.id} p="md" radius="md" withBorder>
                        <Group align="flex-start" spacing="md">
                            <Box>
                                <Avatar src={comment.avatar} radius="xl" />
                                <Text align="center" size="xs" mt="xs">{comment.author}</Text>
                            </Box>
                            <Text>{comment.text}</Text>
                        </Group>
                    </Paper>
                ))}
            </Stack>
        </Container>
    );
}
