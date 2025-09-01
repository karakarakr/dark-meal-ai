import React, { useState } from 'react';
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
import { useForm } from '@mantine/form';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const auth = useAuth();

    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        }
    })

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

                    <form onSubmit={form.onSubmit((values) => {
                        auth.signInSubmit(values)
                    })}>
                        <Stack>
                            <TextInput
                                name='email'
                                label="Email"
                                placeholder="you@example.com"
                                required
                                type="email"
                                key={form.key('email')}
                                {...form.getInputProps('email')}
                            />
                            <PasswordInput
                                name='password'
                                label="Password"
                                placeholder="Your password"
                                required
                                key={form.key('password')}
                                {...form.getInputProps('password')}
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
