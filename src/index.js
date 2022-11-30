import React from 'react';
import ReactDOM, { hydrate } from 'react-dom';

import 'antd/dist/antd.css';

import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import { IntlProvider } from './IntlContext';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(
    <IntlProvider>
      <App />
    </IntlProvider>,
    rootElement
  );
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
