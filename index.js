import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Globalstyle from './GlobalStyle/globalStyle';
import { AuthProvider } from './contexts/authContext';
import {DarkLightProvider} from './contexts/darkLightContext';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Globalstyle>
    <DarkLightProvider>
      <AuthProvider>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <BrowserRouter>
          <Notifications />
          <App/>
        </BrowserRouter>
      </MantineProvider>
      </AuthProvider>
    </DarkLightProvider>
  </Globalstyle>
);
reportWebVitals();
