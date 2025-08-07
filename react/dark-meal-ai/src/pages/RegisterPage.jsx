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
  Flex
} from '@mantine/core';

function RegisterPage() {
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
                Sign Up
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
                    Sign Up
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Container>
        </Flex>
      );
}

export default RegisterPage;