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
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
    const navigate = useNavigate();
    const auth = useAuth();
    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        }
    })

    // const signUpSubmit = (values) => {
    //     const email = values.email;
    //     const password = values.password;

    //     axios.post('http://localhost:3000/auth/register', {
    //         email: email,
    //         password: password
    //     }).then(function (response) {
    //             navigate("/signin");
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };
    
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
    
              <form onSubmit={form.onSubmit((values) => {auth.signUpSubmit(values)})}>
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