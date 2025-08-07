import { useState, useEffect } from 'react'
import '@mantine/core/styles.css';
import axios from 'axios';
import HeaderSearch from './components/common/Header/HeaderSearch';
import { AppShell } from '@mantine/core';
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <HeaderSearch/>
        <AppShell.Main>
          <Outlet/>
        </AppShell.Main>
      </AppShell>
    </>
  )
}

export default App
