import React, {Component} from 'react'

class CurrentStatus extends Component {
  render() {
    let helpIndex = -1;
    let checkoffIndex = -1;
    for (var i=0; i<this.props.help.length; i++) {
      if (this.props.help[i].uid === this.props.uid) {
        helpIndex = i + 1;
        break;
      }
    }
    for (var i=0; i<this.props.checkoff.length; i++) {
      if (this.props.checkoff[i].uid === this.props.uid) {
        checkoffIndex = i + 1;
        break;
      }
    }
    let helpString = helpIndex == -1 ? 'You are not in line for help ' : 'You are #' + helpIndex + ' in line for help';
    let checkoffString = checkoffIndex == -1 ? 'You are not in line to be checked off ' : 'You are #' + checkoffIndex + ' in line to be checked off';
    return <span>{helpString}<br/>{checkoffString}</span>
  }
}

export default CurrentStatus
