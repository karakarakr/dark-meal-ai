import { TextInput, NumberInput, Select, Group, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

const units = [
  { label: 'Grams (g)', value: 'g' },
  { label: 'Kilograms (kg)', value: 'kg' },
  { label: 'Milliliters (ml)', value: 'ml' },
  { label: 'Liters (l)', value: 'l' },
  { label: 'Teaspoon (tsp)', value: 'tsp' },
  { label: 'Tablespoon (tbsp)', value: 'tbsp' },
  { label: 'Pieces (pcs)', value: 'pcs' },
];

export default function IngredientItem({ ingredient, index, onChange, onRemove }) {
  const handleChange = (key, value) => {
    onChange(index, { ...ingredient, [key]: value });
  };

  return (
    <Group mt="xs" grow align="flex-end">
      <TextInput
        label="Ingredient name"
        value={ingredient.name}
        onChange={(e) => handleChange('name', e.target.value)}
        required
      />
      <NumberInput
        label="Quantity"
        value={ingredient.quantity}
        onChange={(value) => handleChange('quantity', value)}
        required
        min={0}
      />
      <Select
        label="Unit"
        value={ingredient.unit}
        onChange={(value) => handleChange('unit', value)}
        data={units}
        clearable
      />
      <ActionIcon color="red" variant="light" onClick={() => onRemove(index)} mt={24}>
        <IconTrash />
      </ActionIcon>
    </Group>
  );
}
