import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
const Messages = ({socket}) =>{
    const [messagesRecieved, setMessagesRecieved] = useState([])

    const messagesColumnRef = useRef(null);
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

//  useEffect(() => {
//     // Last 100 messages sent in the chat room (fetched from the db in backend)
//     socket.on('last_100_messages', (last100Messages) => {
//       console.log('Last 100 messages:', JSON.parse(last100Messages));
//       last100Messages = JSON.parse(last100Messages);
//       // Sort these messages by __createdtime__
//       last100Messages = sortMessagesByDate(last100Messages);
//       setMessagesReceived((state) => [...last100Messages, ...state]);
//     });
//     return () => socket.off('last_100_messages');
//   }, [socket]);

    useEffect(()=>{
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollTop;
    }, [messagesRecieved])

    function sortMessagesByDate(messages){
        return messages.sort(
            (a,b)=> parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
        )
    }

    function formatDataFromTimeStamp(timestamp){
        const date = new Date(timestamp)
        return date.toLocaleDateString()

    }
    return (
        <div className={styles.messagesColumn} ref={messagesColumnRef}>
            {messagesRecieved.map((msg, i)=>(
                <div className={styles.message} key={i}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span className={styles.msgMeta}>{msg.username}</span>
                        <span className={styles.msgMeta}>
                            {console.log(formatDataFromTimeStamp(msg.__createdtime__))}
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