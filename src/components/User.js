import React, { Component } from 'react';

class User extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
          this.props.setUser(user)
        });
      }

    signIn(){
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
this.props.firebase.auth().signInWithPopup( provider );
        this.props.setUser("Guest");
      alert('sign in please');
    }

    signOut(){
        this.props.firebase.auth().signOut();
        alert('Sign Out Please');
    }
    render(){
        const displayedName = this.props.ActiveUser === (undefined) ? "Guest" :this.props.activeUser.displayName;
      return (
        <div>
        <p> hello, {displayedName}</p>
        <button type="text" onClick={this.signIn()}> Sign In </button>
        <button type ="text" onClick= {this.signOut()}> Sign Out </button>
        </div>
      );
    }
  }

  export default User;