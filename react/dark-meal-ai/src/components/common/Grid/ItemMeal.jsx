import React from 'react';
import { Grid, Card, Button, Image, Text, Space } from '@mantine/core';
import { Link } from 'react-router-dom';

function ItemMeal({ mealId, title, imageURL, description }) {
  return (
    <Grid.Col span={4}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                src={
                    imageURL ? imageURL :
                    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                }
                height={160}
                alt="Meal image"
                />
            </Card.Section>

            <Space h="md"></Space>

            <Text size='xl' c="dark">
                {title}
            </Text>

            <Text size="sm" c="dimmed" style={{ 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap'
            }}>
                {description}
            </Text>

            <Link to={`/recipe/${mealId}`}>
                <Button color="blue" fullWidth mt="md" radius="md">
                    View
                </Button>
            </Link>
        </Card>
    </Grid.Col>
  )
}

export default ItemMeal;