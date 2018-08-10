import React, { Component } from 'react';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
import './App.css';
import * as firebase from 'firebase';


  var config = {
    apiKey: "AIzaSyAvkfJixQrwow7fRTV3G7gnGK8ujWdU9po",
    authDomain: "react-chat-app-fa877.firebaseapp.com",
    databaseURL: "https://react-chat-app-fa877.firebaseio.com",
    projectId: "react-chat-app-fa877",
    storageBucket: "react-chat-app-fa877.appspot.com",
    messagingSenderId: "181469896263"
  };
  firebase.initializeApp(config);

 


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addItem: '',
      activeRoom: [],
      activeUser: "",
     };

     this.setActiveRoom = this.setActiveRoom.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room){
this.setState({activeRoom: room},() => console.log("Active room:", this.state.activeRoom));
console.log ("New room activated", room);
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      value: this.state.addItem,
    }
    itemsRef.push(item);
    this.setState({
      addItem: ''
     });
  }

  setUser(user) {
    this.setState({activeUser: user});
  }


  render() {
    
    return (
      
      <div className="App">
        <header className="App-header">
        <h1 className="App-title">Bloc Chat App</h1>
        </header>
       
        <User firebase={firebase} setUser= {this.setUser} activeUser={this.state.activeUser}/>
        
        <RoomList firebase = {firebase} setActiveRoom={ (room) => this.setActiveRoom(room)} />

        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} setUser={this.state.setUser} user={this.state.activeUser}/>

        
      </div>
    );
  }
}

export default App;
