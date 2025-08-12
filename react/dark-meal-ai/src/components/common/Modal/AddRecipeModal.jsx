import {
    Modal,
    TextInput,
    Button,
    Stack,
    Group,
    Title,
} from '@mantine/core';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import IngredientItem from './IngredientItem';
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePuter } from '../../../hooks/usePuter';

export default function AddRecipeModal({ opened, onClose }) {
    const auth = useAuth();
    const navigate = useNavigate();
    const puter = usePuter();

    // const form = useForm({
    // 
    // ДОДАЙ useForm для обробки даної логіки
    // 
    // });

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([
        { name: '', quantity: 0, unit: '' },
    ]);

    const handleIngredientChange = (index, updated) => {
        const updatedList = [...ingredients];
        updatedList[index] = updated;
        setIngredients(updatedList);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: 0, unit: '' }]);
    };

    const handleRemoveIngredient = (index) => {
        const updated = ingredients.filter((_, i) => i !== index);
        setIngredients(updated);
    };

    const fillWithGPT = async () => {
        alert('clicked');
        puter.ai.chat(`
You are an api, who sends only pure JSON responses.
You've been asked to generate a "${title}" recipe JSON using next schema:

{
title: TITLE_OF_RECIPE,
content: DETAILED_CONTENT_HOW_TO_COOK_WITH_HTML_MARKDOWN,
}    
        `).then(res => {
            const parsedData = JSON.parse(res.message.content);
            setTitle(parsedData.title);
            setDescription(parsedData.content);
        });
    }

    const addRecipeToDB = (payload) => {
        const token = localStorage.getItem('accessToken');
        console.log(token);
        axios.post("http://localhost:3000/recipes", {
            title: payload.title,
            content: payload.description,
            imageURL: payload.imageUrl,
            ingredients: payload.ingredients,
            authorId: auth.user.id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(`Response: ${JSON.stringify(response.data.id)}`);
        })
        .catch((error) => console.log(error));
        
        //axios.get("http://localhowt:3000/recipe")
    };

    const handleSubmit = () => {
        const payload = {
            title,
            imageUrl,
            description,
            ingredients,
        };
        console.log('Saving recipe:', payload);
        addRecipeToDB(payload);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={<Title order={3}>Add New Recipe</Title>}
            size="lg"
            centered
            withCloseButton
            lockScroll={false}
        >
            <form>
                <Stack>
                    <TextInput
                        label="Recipe Title"
                        placeholder="e.g. Spaghetti Carbonara"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextInput
                        label="Image URL"
                        placeholder="e.g. https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <Title order={5} mt="sm">Ingredients</Title>
                    {ingredients.map((ingredient, index) => (
                        <IngredientItem
                        key={index}
                        index={index}
                        ingredient={ingredient}
                        onChange={handleIngredientChange}
                        onRemove={handleRemoveIngredient}
                        />
                    ))}
                    <Button
                        variant="light"
                        leftSection={<IconPlus size={16} />}
                        onClick={handleAddIngredient}
                    >
                        Add Ingredient
                    </Button>
                    <Button
                        leftSection={
                            <img 
                                width='20' 
                                height='20' 
                                src='https://static.thenounproject.com/png/7262146-200.png' 
                            />}
                        onClick={() => fillWithGPT()}
                        style={{backgroundColor: 'white', color: 'black'}}
                    >
                        Ask AI to fill up
                    </Button>

                    {/* Add here markdown editor */}
                    <MDEditor
                        value={description}
                        onChange={setDescription}
                    />
                    <MDEditor.Markdown 
                        source={description} 
                        style={{ whiteSpace: 'pre-wrap' }} 
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="default" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>Save</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}

