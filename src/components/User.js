import React, { Component } from 'react';

class USer extends Component {
    constructor(props){
        super(props);
    };


    signIn(){
      alert('sign in please');
    }

    signOut(){
        akert('Sign Out Please');
    }
    render(){
      return (
        <div>
        <button onClick={this.signIn()}> Sign In </button>
        <button onClick= {this.signOut()}> Sign Out </button>
        </div>
      );
    }
  }

  export default User;