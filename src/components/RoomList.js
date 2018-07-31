import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [], 
      newRoomName: ""
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  createRoom(e) {
    e.preventDefault();
    const newRoomName = this.state.newRoomName;
    console.log(newRoomName);
    this.roomsRef.push({
      name: newRoomName 
    });
    this.setState({ newRoomName: ""})
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  roomChange (room) {
    console.log("change room:", room)
    this.props.setActiveRoom(room);
  }


  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room )});
    });
  }
  render() {
    return (
      <section className="roomList">
        {
          this.state.rooms.map((room, index) =>
        <div onCLick= { () =>
          this.roomChange(room)} key={index}>{room.name}
          </div>
          )
        }
        <form onSubmit={ (e) => this.createRoom(e)}>
          Create new room:
          <input type="text" value ={this.state.newRoomName} onChange={ (e) => this.handleChange(e) } />
          <input type="submit" value="submit"></input>
        </form>
      </section>
    );
  }
};

export default RoomList;