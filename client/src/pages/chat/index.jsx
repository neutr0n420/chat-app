import styles from './styles.module.css'
import MessagesReceived from './Messages'
import SendMessage from './send-message'

const Chat = ({socket, username, room}) =>{
    return(
        <div className={StyleSheet.chatContainer}>
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