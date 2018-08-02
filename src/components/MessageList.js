import React, {Component} from 'react';

export class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages:[], 
      content:" ", 
      username:" ", 
      sentAt:" ", 
      roomId:" "
    };
    
    this.messageRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this);
    this.messageContent = this.messageContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  componentDidMount() {
      this.messageRef.on('child_added', snapshot => {
          const message = snapshot.val();
          this.setState({ messages: this.state.messages.concat( message )});
            console.log("message loaded");
        });
        console.log(this.props.activeRoom);
      }
      
            
              messageContent (e) {
                e.preventDefault();
                this.setState(
                  {
                  content: e.target.value,
                  username: "username",
                  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                  roomId: this.props.activeRoom.key
                })
              }
            
              createMessage(e) {
                e.preventDefault();
                this.messageRef.push(
                  {
                    content: this.state.content,
                    username: this.state.username,
                    sentAt: this.state.timeStamp,
                    roomId: this.state.roomId,
                  }
                );
                this.setState({
                  content: "",
                  username: "",
                  sentAt: "",
                  roomId: "",
                });
              }

              handleChange = (e) => {
                this.setState({ message: e.target.value });
              }

              

              render() {
                const messageList = (this.state.messages.map((message) => {cd
                  if (message.roomId === this.props.activeRoom.key) {
                    console.log("messageList fired")
                    return <div key={message.roomId}>{message.content}</div>
                  }
                  console.log('messageList not fired');
                  return null;
                  })
                );
            
                return (
                  <section className="activeMessageList">
                    <div>Current Room: {this.props.activeRoom.name}</div>
                   <div>
                   <p>Message List:{messageList.content}</p>
                   </div>
                  </section>
                );
              }
            };
    
  
  
export default MessageList;