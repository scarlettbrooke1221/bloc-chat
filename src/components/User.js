import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user)
    });
  }

  signIn(e) {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider);
  console.log("signed in");
  };

  signOut(e) {
    this.props.firebase.auth().signOut();
    this.props.setUser("Guest");
    console.log("signed out")
  }

  render() {

    const displayName = this.props.activeUser === (undefined || null) ? "Guest" : this.props.activeUser.displayName;

    return (
        <div>
        <p className = "userName">Hello, {displayName}</p>
        <button type="text" onClick={() => this.signIn()}>Sign In</button>
        <button type="text" onClick={() => this.signOut()}>Sign Out</button>
        
        </div>
      
    );
  }
};
export default User;