import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages:[], 
      message: {
      content:" ", 
      username:" ", 
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId:" ",
      }, 
    newMessage: " ",
    }
    
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  };

  createMessage(e) {
    e.preventDefault();
    console.log(this.props.activeRoom.key + ' ....is the active room');
    this.messagesRef.push({
        content: this.state.newMessage,
        roomId: this.props.activeRoom.key,
        username: !this.props.username ? 'Guest' : this.props.username.displayName,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({ newMessage: ''});
}

componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
  const message = snapshot.val();
  message.key = snapshot.key;
  this.setState({ messages: this.state.messages.concat(message) })
      
    });
  }

  handleChange(e) {
   this.setState({ newMessage: e.target.value });
}
             
deleteMessage(message){
  this.messagesRef.child(message.key).remove();
  const index = this.state.messages.indexOf(message);
  this.state.messages.splice(index, 1);
  this.setState({messages: this.state.messages})
}            

             
            
              
              render() {
                console.log(this.state.messages)
                return (
                  <div className = "messageList">
                  <h4>Enter your comment here:</h4>
                  
                  <ul>
                  { this.state.messages.map( (message, index) => {
                  if (this.props.activeRoom.key === message.roomId) {
                   return <li key={ index }> "{message.content}"  - {message.username} <button className="deletebtn btn-danger pull-right" onClick={ () => this.deleteMessage(message)}>Delete</button> </li>
                  }
                   
                      })}
                    </ul>
                    <form className="new-message" onSubmit={ (e) => this.createMessage(e) }> 
                    <input placeholder="your message" type="text" value={this.state.newMessage} onChange={ (e) => this.handleChange(e)} />
                   <input className="roomname" type="submit" value="Send" />
                  </form>
                
                  </div>
                      )
                    }
                  }
  
  
export default MessageList;