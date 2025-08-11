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
} from '@mantine/core';
import axios from 'axios';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RecipePage() {
    const { id } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({});
    const [author, setAuthor] = useState({});
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        axios.get(`http://localhost:3000/recipes/${id}`)
          .then(response => {   
                setRecipe(response.data);
            })
          .catch(error => console.error('Error fetching tasks:', error));
        
        console.log(`ID: ${recipe.authorId}`);
      }, []);

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${recipe.authorId}`)
        .then(response => {
            setAuthor(response.data);
            console.log("Answer is: " + response.data.email);
        })
        .catch(error =>console.error('Error retrieving author:', error) );
    }, [recipe.authorId]);

    const [comments, setComments] = useState([
    {
        id: 1,
        author: 'JohnDoe',
        avatar: 'https://i.pravatar.cc/100?img=1',
        text: 'Looks delicious! I will try it soon.',
    },
    {
        id: 2,
        author: 'JaneSmith',
        avatar: 'https://i.pravatar.cc/100?img=2',
        text: 'Great recipe, thanks for sharing!',
    },
    ]);
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
        axios.delete(
            `http://localhost:3000/recipes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(response => {
                console.log(response);
                console.log('deleted successfully!\n');
            })
            .catch(error => console.error(error));
    };

    console.log("ASDAS" + recipe);
    return (
    <Container size="md" py="xl">
        {/* Section 1: Image */}
        <Box mb="md">
        <Image
            src={
                recipe.imageURL ? recipe.imageURL :
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8QgpXEXt66DvkNO1dhHkz2EmxbJbsQsLLw&s"
            }
            radius={10}
            alt="Recipe"
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
        />
        </Box>

        {/* Section 2: Content */}
        <Box mb="xl">
            <Title order={1} mb="sm">
                {recipe.title}
            </Title>
            <Text mb="sm">
                {/* {recipe.content} */}
                <MarkdownPreview source={recipe.content} style={{
                    background: 'none',
                    textAlign: 'left',
                    width: '100%',
                }} />
            </Text>
            <Divider my="md" />
            <Title order={2} mb="sm" style={{ textAlign: 'left' }}>
                Ingredients
            </Title>
            <Text mb="sm" style={{ textAlign: 'left' }}>
                <List>
                    { 
                        recipe.ingredients &&
                            recipe.ingredients.map((ingredient, index) => (
                                <List.Item key={index}>
                                    {ingredient.name}: {ingredient.quantity}{ingredient.unit}
                                </List.Item>
                            ))
                    }
                </List>
            </Text>
            <Flex justify="space-between" mt="lg" w="100%">
                <Text size="sm" italic>
                    Created at: {recipe.createdAt}
                </Text>
                <Text size="sm" italic>
                    Author email: {author.email}
                </Text>
            </Flex>
            {(auth.user && auth.user.id === author.id) && (
                <>
                    <Space h="md"/>
                    <Group>
                        <Button>Edit meal</Button>
                        <Button color="red" onClick={() => {
                            deleteMeal(); 
                            navigate('/');
                        }}>Delete meal</Button>
                    </Group>
                </>
            )}
        </Box>

        <Divider my="lg" />

        {/* Section 3: Add Comment */}
        <Box mb="xl">
            <Textarea
                placeholder="Write your comment..."
                autosize
                minRows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.currentTarget.value)}
            />
            <Button mt="sm" onClick={handleAddComment}>
                Add Comment
            </Button>
        </Box>

        <Divider my="lg" />

        {/* Section 4: Comments */}
        <Stack>
        {comments.map((comment) => (
            <Paper key={comment.id} p="md" radius="md" withBorder>
                <Group align="flex-start" spacing="md">
                    <Box>
                        <Avatar src={comment.avatar} radius="xl" />
                        <Text align="center" size="xs" mt="xs">
                            {comment.author}
                        </Text>
                    </Box>
                    <Text>{comment.text}</Text>
                </Group>
            </Paper>
        ))}
        </Stack>
    </Container>
    );
}
