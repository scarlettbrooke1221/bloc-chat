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
   const displayName = this.props.setUser === ( this.newMethod()) ? "Guest" : this.props.setUser.displayName;
   const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.displayName;
      this.props.setUser(user, displayName);
      console.log("signed in");
    });
  }



  newMethod() {
    return null;
  }

signOut() {
  this.props.firebase.auth().signOut().then(() => {
    this.props.setUser("Guest");
    console.log("signed out")
  });
}
  

  

render() {


  return (
   <div>
   <p>Hi, {this.props.setUser.displayName}. </p>
   <p>{this.props.setUser.displayName === 'Guest' ? "Please sign in" : "You're signed in."}</p>
     <button onClick={this.signIn}>Sign In</button>
     
     <button onClick={this.signOut}>Sign Out</button>
       
    </div>
 )
}
  }

export default User;