import React, { useState, useEffect, useContext } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Mic, Send } from '@material-ui/icons'
import { useParams } from 'react-router-dom'
import { db } from '../../assets/firebase'
import firebase from 'firebase'
import { StateContext } from '../../ContextAPI'


function Chat() {

    const [state] = useContext(StateContext)

    const [seed, setSeed] = useState('')
    const [inputMsg, setInputMsg] = useState('')
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])

    
    useEffect(() => {
        if(roomId) {
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => (
                    setRoomName(snapshot.data().name)
                ))

            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setMessages(snapshot.docs.map((doc) => (
                        doc.data()
                    )))
                })
                
        }
    }, [roomId])


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])


    const handleSendMessage = (e) => {
        e.preventDefault()

        db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .add({
                name: state.user.displayName,
                text: inputMsg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

        setInputMsg('')
    }


    return (
        <div className="chat">
            <div className="chat__headerContainer">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen on &nbsp;
                        {
                            new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>
                
                <div className="chat__headerIcons">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__bodyContainer">
                {
                    messages.map(({name, text, timestamp}) => (
                        <p
                            key={timestamp} 
                            className={`chat__message ${name === state.user.displayName && "chat__messageSent"}`}
                        >
                            {name !== state.user.displayName && <p className="chat__messageUser">{name}</p>}
                            {text}
                            <p className="chat__messageTimestamp">
                                {
                                    new Date(timestamp?.toDate()).toUTCString()
                                }
                            </p>
                        </p>
                    ))
                }
            </div>

            <div className="chat__footerContainer">
                <InsertEmoticon />
                <form>
                    <input 
                        type="text"
                        placeholder="Type a message"
                        value={inputMsg}
                        onChange={(e) => setInputMsg(e.target.value)} 
                    />
                    <button 
                        type="submit" 
                        onClick={handleSendMessage}
                    >
                        Send a message
                    </button>
                </form>
                { inputMsg ? <Send /> : <Mic /> }
            </div>
        </div>
    )
}

export default Chat
