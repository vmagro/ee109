import React, {Component} from 'react'
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'

const styles = require('styles/app.scss')

const SignupForm = require('./SignupForm')
const Queue = require('./Queue')

var helpRef = new Firebase('https://ee109.firebaseio.com/help')
var checkoffRef = new Firebase('https://ee109.firebaseio.com/checkoff')

const App = React.createClass({
  mixins: [ReactFireMixin],

  componentWillMount: function () {
    this.bindAsArray(helpRef, 'helpQueue');
    this.bindAsArray(checkoffRef, 'checkoffQueue');
    this.setState({
      admin: true
    });
  },

  render: function() {
    return (
      <div>
        <SignupForm onSubmit={this.onSubmit}/>
        <div className={styles.queueWrapper}>
          <div className={styles.queue}>
              <h2>Help Queue</h2>
              <Queue entries={this.state.helpQueue} admin={this.state.admin} onDelete={this._deleteHelp}/>
          </div>
          <div className={styles.queue}>
              <h2>Check Off Queue</h2>
              <Queue entries={this.state.checkoffQueue} admin={this.state.admin} onDelete={this._deleteCheckoff}/>
          </div>
        </div>
      </div>
    )
  },

  onSubmit: function(form) {
    let entry = {
      name: form.name
    }
    if (form.help) {
      helpRef.push(entry);
    } else {
      checkoffRef.push(entry);
    }
  },

  _deleteHelp: function (entry) {
    helpRef.child(entry['.key']).remove()
  },

  _deleteCheckoff: function (entry) {
    checkoffRef.child(entry['.key']).remove()
  }
});

export default App
