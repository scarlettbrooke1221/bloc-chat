import React, { Component } from 'react';
import  RoomList from './components/RoomList.js'
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
  constructor() {
    super();
    this.state = {
      addItem: '',
      rooms: []
     };
     
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="App-title">Bloc Chat App</h1>
        </header>
        <RoomList firebase = {firebase}/>
        
      </div>
    );
  }
}

export default App;
