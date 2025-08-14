import React from 'react';
import { Grid, Card, Button, Image, Text, Space, Badge, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

function ItemMeal({ mealId, title, imageURL, description, difficulty }) {
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

    return (
        <Grid.Col span={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src={
                            imageURL
                                ? imageURL
                                : "https://res.cloudinary.com/ddkwopn8u/image/upload/v1755092431/qql62pjlj5szyv5pqoe8.png"
                        }
                        height={160}
                        alt="Meal image"
                    />
                </Card.Section>

                <Space h="md" />

                <Group justify="space-between" align="center">
                    <Text size="xl" c="gray">
                        {title}
                    </Text>
                    {difficulty && (
                        <Badge color={getDifficultyColor(difficulty)} variant="filled">
                            {difficulty}
                        </Badge>
                    )}
                </Group>

                <Text
                    size="sm"
                    c="dimmed"
                    style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    }}
                >
                    {description}
                </Text>

                <Link to={`/recipe/${mealId}`}>
                    <Button color="blue" fullWidth mt="md" radius="md">
                        View
                    </Button>
                </Link>
            </Card>
        </Grid.Col>
    );
}

export default ItemMeal;
