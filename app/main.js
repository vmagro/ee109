import React from 'react';
import ReactDOM from 'react-dom';

import 'styles/common.scss'

import createBrowserHistory from 'history/lib/createBrowserHistory'

// import App from './components/App'
const App = require('./components/App')

let history = createBrowserHistory()
ReactDOM.render((
  <App />
), document.getElementById('content'))
