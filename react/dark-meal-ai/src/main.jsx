import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { MantineProvider } from '@mantine/core';
import RegisterPage from './pages/RegisterPage.jsx';
import MainPage from './pages/MainPage.jsx';
import RecipePage from './pages/RecipePage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    // errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <MainPage/>
        // provider: MyProvider
      },
      {
        path: "/signin",
        element: <LoginPage/>
      },
      {
        path: "/signup",
        element: <RegisterPage/>
      },
      {
        path: "/recipe",
        element: <RecipePage/>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
)
