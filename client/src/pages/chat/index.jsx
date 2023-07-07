import styles from './styles.module.css'
import MessagesReceived from './Messages'

const Chat = ({socket}) =>{
    return(
        <div className={StyleSheet.chatContainer}>
            <div>
                <MessagesReceived socket={socket}/>
            </div>
        </div>
    )
}

export default Chat