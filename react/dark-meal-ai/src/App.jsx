import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import HeaderSearch from './components/common/Header/HeaderSearch';
import { AppShell } from '@mantine/core';
import './App.css';
import { Outlet } from 'react-router-dom';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <>
    <AuthProvider>
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
          <HeaderSearch/>
          <AppShell.Main>
            <Outlet/>
          </AppShell.Main>
        </AppShell>
      </AuthProvider>
    </>
  )
}

export default App
