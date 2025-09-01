import React from 'react';
import { AppShell, Container, Group, Button, Text, Avatar } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function HeaderSearch() {
  const auth = useAuth();
  
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
          {!auth.user ? (
            <>
              <Link to={`signin`}>
                <Button variant="default">Sign In</Button>
              </Link>
              <Link to={`signup`}>
                <Button>Sign Up</Button>
              </Link>
            </>
            ) : (
              <>
                <Link to={`/user/${auth.user.id}`}>
                  <Avatar radius={'xl'}/>
                </Link>
                <Button variant="filled" color="red" onClick={auth.logOut}>Logout</Button>
              </>
            )
          }
          </Group>
        </Container>
      </AppShell.Header>
    </>
  );
}
