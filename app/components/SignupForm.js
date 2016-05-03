import React, {Component} from 'react'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      help: true
    }
  }

  render() {
    return (
      <div>
        <input type="radio" checked={this.state.help} onChange={(e) => this.setState({help: e.target.value})}/>Help <br/>
        <input type="radio" checked={!this.state.help} onChange={(e) => this.setState({help: !e.target.value})}/>Check Off <br/>
        <button onClick={() => this.props.onSubmit(this.state)}>Submit</button>
      </div>
    )
  }
}

SignupForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}

export default SignupForm
