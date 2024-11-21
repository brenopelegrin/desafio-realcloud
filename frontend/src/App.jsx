import { BrowserRouter as Router } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import GetRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Router>
          <Navbar/>
          <GetRoutes/>
        </Router>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App
