import React from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'

import 'styles/common.scss'

import createBrowserHistory from 'history/lib/createBrowserHistory'

// import App from './components/App'
const App = require('./components/App')

let history = createBrowserHistory()

const user = window.localStorage['user']
if (!user) {
  let ref = new Firebase('https://ee109.firebaseio.com')
  ref.authAnonymously(function (err, authData) {
    window.localStorage['user'] = JSON.stringify(authData)
    render(err, authData)
  });
} else {
  render(null, JSON.parse(user));
}

function render(err, authData) {
  if (err)
    console.error(err)
  console.log(authData)
  ReactDOM.render((
    <App auth={authData}/>
  ), document.getElementById('content'))
}
