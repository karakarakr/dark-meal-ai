import React from 'react';
import { Grid, Card, Group, Badge, Button, Image, Text, Space } from '@mantine/core';

function ItemMeal({ title, shortDescription, date }) {
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

            <Button color="blue" fullWidth mt="md" radius="md">
                View
            </Button>
        </Card>
    </Grid.Col>
  )
}

export default ItemMeal;