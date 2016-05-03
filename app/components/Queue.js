import React, {Component} from 'react'

class Queue extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.entries.map((e) => {
          return <div key={e['.key']} style={{fontSize: 20}}>{e.name} {this._renderDelete(e)}</div>
        })}
      </div>
    )
  }

  _renderDelete(e) {
    if (this.props.admin || this.props.uid === e.uid) {
      return <button onClick={this.props.onDelete.bind(null, e)}>x</button>
    }
  }
}

Queue.propTypes = {
  admin: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  entries: React.PropTypes.array.isRequired,
  uid: React.PropTypes.string.isRequired
}

export default Queue
