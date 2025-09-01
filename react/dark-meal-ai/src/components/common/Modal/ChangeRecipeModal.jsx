import {
    Modal,
    TextInput,
    Button,
    Stack,
    Group,
    Title,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconPlus } from '@tabler/icons-react';
import IngredientItem from './IngredientItem';
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePuter } from '../../../hooks/usePuter';
import { Select, NumberInput } from '@mantine/core';
import DropZone from './DropZone';

export default function ChangeRecipeModal({ opened, onClose, existingData, id }) {
    const auth = useAuth();
    const navigate = useNavigate();
    const puter = usePuter();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([
        { name: '', quantity: 0, unit: '' },
    ]);
    const [cookingTime, setCookingTime] = useState({
        hours: 0, minutes: 0
    });
    const [difficulty, setDifficulty] = useState('');

    useEffect(() => {
        setTitle(existingData.title);
        setDescription(existingData.content);
        setIngredients(existingData.ingredients);
        setImageUrl(existingData.imageURL);
        setCookingTime(existingData.cookingTime);
        setDifficulty(existingData.difficulty);
    }, []);

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

    const fillWithGPT = () => {
        puter.ai.chat(`
You are an api, who sends only pure JSON responses.
You've been asked to generate a "${(title || 'Random recipe')}" recipe JSON using next schema:

{
title: TITLE_OF_RECIPE,
content: DETAILED_CONTENT_HOW_TO_COOK_WITH_HTML_MARKDOWN( No ingredients in content, only description and steps ),
ingredients: ARRAY_WITH_JSON_OBJECT_BASED_ON_SCHEMA( { name: STRING, quantity: NUMBER, unit: 'g' or 'kg' or 'ml' or 'l' or 'tsp' or 'tbsp' or 'pcs' } )
difficulty: ENUM_WITH_VALUES( 'Easy', 'Medium', 'Hard' ),
cookingTime: JSON_OBJECT_BASED_ON_SCHEMA( { hours: NUMBER, minutes: NUMBER } )
}    
        `).then(res => {
            const parsedData = JSON.parse(res.message.content);
            setTitle(parsedData.title);
            setDescription(parsedData.content);
            setIngredients(parsedData.ingredients);
            setDifficulty(parsedData.difficulty);
            setCookingTime(parsedData.cookingTime);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }

    const updateRecipeToDB = (payload) => {
        const token = localStorage.getItem('accessToken');
        console.log(`RECIPE TOKEN: ${token}`);
        axios.patch(`http://localhost:3000/recipes/${id}`, {
            title: payload.title,
            content: payload.description,
            imageURL: payload.imageUrl,
            ingredients: payload.ingredients,
            difficulty: payload.difficulty,
            cookingTime: payload.cookingTime
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(`Response: ${JSON.stringify(response.data.id)}`);
        })
        .catch((error) => console.log(error));
    };

    const handleSubmit = () => {
        const payload = {
            title,
            imageUrl,
            description,
            ingredients,
            difficulty,
            cookingTime
        };
        console.log('Saving recipe:', payload);
        updateRecipeToDB(payload);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const clearFiels = () => {
        setTitle('');
        setImageUrl('');
        setDescription('');
        setIngredients({ name: '', quantity: 0, unit: '' });
        setDifficulty('');
        setCookingTime({ hours: 0, minutes: 0 });
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
                    <DropZone
                        imageURL={imageUrl}
                        setImageURL={setImageUrl}
                    />

                    {/* Difficulty */}
                    <Select
                        label="Difficulty"
                        placeholder="Select difficulty"
                        data={['Easy', 'Medium', 'Hard']}
                        value={difficulty}
                        onChange={setDifficulty}
                        required
                    />

                    {/* Cooking time */}
                    <Group grow>
                        <NumberInput
                            label="Hours"
                            min={0}
                            value={cookingTime.hours}
                            onChange={(val) => setCookingTime({ ...cookingTime, hours: val || 0 })}
                        />
                        <NumberInput
                            label="Minutes"
                            min={0}
                            max={59}
                            value={cookingTime.minutes}
                            onChange={(val) => setCookingTime({ ...cookingTime, minutes: val || 0 })}
                        />
                    </Group>

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
                        onClick={() => {
                            setLoading(true);
                            fillWithGPT();
                        }}
                        style={{ backgroundColor: 'white', color: 'black' }}
                        loading={loading}
                    >
                        Ask AI to fill up
                    </Button>

                    {/* Markdown editor */}
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
                        <Button style={{ backgroundColor: 'white', color: 'black' }} onClick={clearFiels}>
                            Clear
                        </Button>
                        <Button onClick={handleSubmit}>Save</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}

