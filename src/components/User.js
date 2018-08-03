import React, { Component } from 'react';


class User extends Component {
  constructor(props) {
		super(props); 
		
		this.state = {
      signedIn: false
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.notSignedIn = this.notSignedIn.bind(this);
  }
      
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user)
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.props.setUser(user);
      console.log("signed in");
    });
    this.setState({ signedIn: true });
  }

   signOut() {
  this.props.firebase.auth().signOut().then(() => {
    this.props.setUser(null);
    console.log("signed out")
  });
  this.setState({ signedIn: false });
}

notSignedIn(isSignedIn) {
  if (!this.props.user)
  return <p> Please sign in </p>
}

render() {
  return (
   <div>
   
     {this.notSignedIn(this.signedIn)}
     <button onClick={this.signIn}>Sign In</button>
     <button onClick={this.signOut}>Sign Out</button>
       <p>Hi, {this.props.currentUser}. {this.props.currentUser === 'Guest' ? "Please sign in" : "You're signed in."}</p>
    </div>
 )
}
}
export default User;