import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'



const Home = ({username, setUsername, room, setRoom, socket}) =>{
    const navigate = useNavigate()

    const joinRoom = () =>{
        if(username !=='' && room !== ''){
            socket.emit('join_room', {username, room})
            console.log("Room joined")
            // console.log(username, room)
            navigate('/chat', {replace: true})
        }
    }
    return(
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>{`Chit-Chat`}</h1>
                <input 
                    className={styles.input}
                    placeholder="Name"  
                    onChange={(e) =>setUsername(e.target.value)}
                    />
                <select 
                    className={styles.input}
                    onChange={(e) => setRoom(e.target.value)}
                    >
                    <option>-- Select Room --</option>
                    <option value="Rant's">Rant's</option>
                    <option value="Gossip">Gossip</option>
                    <option value="Discuss">Discuss</option>
                    <option value="advice">Advice</option>
                </select>
                <button 
                    className="btn btn-secondary" 
                    style={{width: '100%'}}
                    onClick={joinRoom}
                    >
                        Join Room
                        </button>
            </div>
        </div>
    )
}
export default Home
