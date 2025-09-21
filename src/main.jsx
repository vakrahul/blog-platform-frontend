import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async'; // 1. Import
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider> {/* 2. Wrap your App */}
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);