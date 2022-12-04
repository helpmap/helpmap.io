import React from 'react';
import ReactDOM from 'react-dom/client';

import 'antd/dist/reset.css';

import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import { IntlProvider } from './IntlContext';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <IntlProvider>
      <App />
    </IntlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
