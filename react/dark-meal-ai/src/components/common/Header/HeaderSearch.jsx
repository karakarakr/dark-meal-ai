import React from 'react';
import { AppShell, Container, Group, Button, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Outlet, Link } from 'react-router-dom';

// ТУДУ
// Зробити роутинг на сторінці
// ТУДУ

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
          <Link to={`/`}>
            <Text fw={700} fz="xl">
              DarkMeals
            </Text>
          </Link>

          <Group gap="xs">
            <Link to={`signin`}>
              <Button variant="default">Sign In</Button>
            </Link>
            <Link to={`signup`}>
              <Button>Sign Up</Button>
            </Link>
          </Group>
        </Container>
      </AppShell.Header>
    </>
  );
}
