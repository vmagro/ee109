import React, {Component} from 'react'
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'

const styles = require('styles/app.scss')

const SignupForm = require('./SignupForm')
const Queue = require('./Queue')

const helpRef = new Firebase('https://ee109.firebaseio.com/help')
const checkoffRef = new Firebase('https://ee109.firebaseio.com/checkoff')
const usersRef = new Firebase('https://ee109.firebaseio.com/users');

const App = React.createClass({
  mixins: [ReactFireMixin],

  componentWillMount: function () {
    this.bindAsArray(helpRef, 'helpQueue');
    this.bindAsArray(checkoffRef, 'checkoffQueue');
    this.bindAsObject(usersRef, 'users');
  },

  render: function() {
    // already created an account, show normal interface
    if (this.state.users && this.state.users[this.props.auth.uid]) {
      const isAdmin = this.state.users[this.props.auth.uid].admin;
      return (
        <div>
          <h1>https://vinnie.io/ee109</h1>
          <SignupForm onSubmit={this.onSubmit}/>
          <div className={styles.queueWrapper}>
            <div className={styles.queue}>
                <h2>Help Queue</h2>
                <Queue entries={this.state.helpQueue}
                       admin={isAdmin}
                       onDelete={this._deleteHelp}
                       uid={this.props.auth.uid}/>
            </div>
            <div className={styles.queue}>
                <h2>Check Off Queue</h2>
                <Queue entries={this.state.checkoffQueue}
                       admin={isAdmin}
                       onDelete={this._deleteCheckoff}
                       uid={this.props.auth.uid}/>
            </div>
          </div>
        </div>
      )
    }
    // new user, ask for their name first
    else {
      return (
        <div>
          <h1>https://vinnie.io/ee109</h1>
          <input placeholder="Your name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
          <button onClick={this._submitName}>Login</button>
        </div>
      )
    }
  },

  onSubmit: function(form) {
    let entry = {
      name: this.state.users[this.props.auth.uid].name,
      uid: this.props.auth.uid
    }
    if (form.help) {
      helpRef.push(entry);
    } else {
      checkoffRef.push(entry);
    }
  },

  _submitName: function() {
    usersRef.child(this.props.auth.uid).set({
      name: this.state.name,
      admin: false
    })
  },

  _deleteHelp: function (entry) {
    helpRef.child(entry['.key']).remove()
  },

  _deleteCheckoff: function (entry) {
    checkoffRef.child(entry['.key']).remove()
  }
});

App.propTypes = {
  auth: React.PropTypes.object.isRequired
}

export default App
