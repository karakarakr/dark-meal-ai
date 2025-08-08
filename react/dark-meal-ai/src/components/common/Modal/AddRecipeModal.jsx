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
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';


export default function AddRecipeModal({ opened, onClose }) {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([
        { name: '', quantity: 0, unit: '' },
    ]);

    const editor = useEditor({
        extensions: [
          StarterKit,
          Underline,
          Link,
          Superscript,
          SubScript,
          Highlight,
          TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content,
      });

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

    const handleSubmit = () => {
        const payload = {
            title,
            imageUrl,
            description,
            ingredients,
        };
        console.log('Saving recipe:', payload);
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
        >
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

            <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>

            <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>Save</Button>
            </Group>
            </Stack>
        </Modal>
    );
}

