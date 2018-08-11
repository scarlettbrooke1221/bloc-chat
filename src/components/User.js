import React, { Component } from 'react';


class User extends Component {
  constructor(props) {
		super(props); 
		
		this.state = {
      signedIn: false
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    }
      
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
     
      this.props.setUser(user)
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
    console.log("signed in")
    }
      
 
signOut() {
  this.props.firebase.auth().signOut();
    console.log("signed out")
  }
  
  

render() {
  const guest = 'Guest';
 console.log("active user", this.props.activeUser)
  return (
   <div>
   <p>Hi, {this.props.activeUser ? this.props.activeUser.displayName : guest}.   </p> 
   <p>{this.props.user === null ? "Please sign in" : "You're signed in."}</p>
   
     <button onClick={this.signIn}>Sign In</button>
     <button onClick={this.signOut}>Sign Out</button>
       
    </div>
 ) 
}
  }

export default User;