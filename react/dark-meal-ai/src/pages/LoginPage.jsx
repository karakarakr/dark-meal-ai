import React from 'react';
import '@mantine/core/styles.css';
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Stack,
  Flex,
} from '@mantine/core';

export default function LoginPage() {
  return (
    <Flex
        justify="center"
        align="center"
        style={{ height: '80vh' }}
    >
      <Container size={420} w="100%">
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          style={{ width: '100%' }}
        >
          <Title order={2} ta="center" mb="md">
            Sign in to your account
          </Title>

          <form>
            <Stack>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                required
                type="email"
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
              />
              <Button type="submit" fullWidth mt="md">
                Sign In
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Flex>
  );
}
