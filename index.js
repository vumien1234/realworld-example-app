import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Globalstyle from './GlobalStyle/globalStyle';
import { AuthProvider } from './contexts/authContext';
import {DarkLightProvider} from './contexts/darkLightContext';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Globalstyle>
    <DarkLightProvider>
      <AuthProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
      </AuthProvider>
    </DarkLightProvider>
  </Globalstyle>
);
reportWebVitals();
