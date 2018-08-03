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
                  username: this.props.username,
                  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                  roomId: this.props.activeRoom.key
                })
              }
            
              createMessage(e) {
                e.preventDefault();
                this.messageRef.push(
                  {
                    content: this.state.value,
                    username: this.props.user ? this.props.user.displayName : 'Guest', 
                    sentAt: this.state.timeStamp,
                    roomId: this.state.activeRoom.key,
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

              sendMessage(event) {
                this.createMessage(this.messagesRef.push({
                  message: event.target.value, 
                })); 
              }
            
              handleMessage(event) {
                this.setState({ value: event.target.value }); 
              }
            

              render() {
                return (
                  <section className = "messageList">
                    <h3>Messages</h3>
                    <h3> {this.props.activeRoom.name}: {this.props.activeRoom.content} </h3>
                    
                   
                  </section>
                )
              }
            }
    
  
  
export default MessageList;