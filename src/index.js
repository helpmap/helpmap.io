import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';

import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { IntlProvider } from './IntlContext';

ReactDOM.render(
  <IntlProvider>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
