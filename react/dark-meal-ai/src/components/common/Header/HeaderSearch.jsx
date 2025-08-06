import React from 'react';
import { AppShell, Container, Group, Button, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function HeaderSearch() {
  return (
    <>
      <AppShell.Header>
        <Container
          size="xl"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {/* Логотип */}
          <Text fw={700} fz="xl">
            DarkMeals
          </Text>

          {/* Пошук */}
          <TextInput
            placeholder="Search meals..."
            leftSection={<IconSearch size={16} />}
            style={{ flexGrow: 1, maxWidth: 400 }}
          />

          {/* Кнопки */}
          <Group gap="xs">
            <Button variant="default">Sign In</Button>
            <Button>Sign Up</Button>
          </Group>
        </Container>
      </AppShell.Header>
    </>
  );
}
