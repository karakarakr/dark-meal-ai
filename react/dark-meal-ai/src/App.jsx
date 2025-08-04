import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [firstResponse, setFirstResponse] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3000/blah')
      .then(response => setFirstResponse(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <>
      <h1>{firstResponse}</h1>
    </>
  )
}

export default App
