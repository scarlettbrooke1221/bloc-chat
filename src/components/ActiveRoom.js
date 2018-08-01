import React, { Component } from 'react';


class ActiveRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    return (
      <section>
        <div>Active Room: {this.props.activeRoom.name}</div>
      </section>
    );
  }
}

export default ActiveRoom;