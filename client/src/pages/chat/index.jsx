import styles from './styles.module.css'
import MessagesReceived from './Messages'
import SendMessage from './send-message'
import RoomsAndUsers from './room-and-join'
const Chat = ({socket, username, room}) =>{
    return(
        <div className={styles.chatContainer}>
            <RoomsAndUsers socket={socket} username={username} room = {room}/>
            <div>
                <MessagesReceived socket={socket}/>
                <SendMessage 
                    socket={socket}
                    username={username}
                    room = {room}
                />

            </div>
        </div>
    )
}

export default Chat