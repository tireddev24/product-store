import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import App from './App'
import { AuthProvider } from './auth/auth';

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider  toastOptions={{ defaultOptions: { position: 'top', duration: 1500 } }}>
      <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)