import styles from './styles.module.css';
import { useState, useEffect } from 'react';
const Messages = ({socket}) =>{
    const [messagesRecieved, setMessagesRecieved] = useState([])
    useEffect(() =>{
        socket.on('receive_message', (data)=>{
            setMessagesRecieved((state)=>[
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__
                },
            ])
            
        })
        return () => socket.off('receive_message')
    }, [socket])
    function formatDataFromTimeStamp(timestamp){
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }
    return (
        <div className={styles.messagesColumn}>
            {messagesRecieved.map((msg, i)=>(
                <div className={styles.message} key={i}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span className={styles.msgMeta}>{msg.username}</span>
                        <span className={styles.msgMeta}>
                         {formatDataFromTimeStamp(msg.__createdtime__)}   
                        </span>
                    </div>
                    <p className={styles.msgText}>{msg.message}</p>
                </div>
            ))}
        </div>
      );
}

export default Messages