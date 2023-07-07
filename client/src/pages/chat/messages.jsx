import styles from './styles.module.css';
import { useState, useEffect } from 'react';
const Messages = ({socket}) =>{
    const [messagesRecieved, setMessagesRecieved] = useState([])
    socket.on('join_room', (data)=>{
        console.log("test is this getting triggered?")
    })
    function formatDataFromTimeStamp(timestamp){
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }
    
    return(
        <div className={styles.messageColumn}>
            <h1>Hello world</h1>
        </div>
    )
}

export default Messages