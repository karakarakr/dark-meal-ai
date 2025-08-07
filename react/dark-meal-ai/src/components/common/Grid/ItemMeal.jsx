import React from 'react';
import { Grid, Card, Group, Badge, Button, Image, Text, Space } from '@mantine/core';
import { Link } from 'react-router-dom';

function ItemMeal({ mealId, title, shortDescription, date }) {
  return (
    <Grid.Col span={4}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                height={160}
                alt="Norway"
                />
            </Card.Section>

            <Space h="md"></Space>

            <Text size='xl' c="dark">
                {title}
            </Text>

            <Text size="sm" c="dimmed">
                {shortDescription}
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