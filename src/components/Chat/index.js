import React, { useState, useEffect, useContext } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Mic, Send } from '@material-ui/icons'
import { useParams } from 'react-router-dom'
import { db } from '../../assets/firebase'
import firebase from 'firebase'
import { StateContext } from '../../ContextAPI'
import NoChat from '../NoChat'



function Chat() {

    const { roomId } = useParams()
    const [state] = useContext(StateContext)

    const [seed, setSeed] = useState('')
    const [inputMsg, setInputMsg] = useState('')
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [lastSeen, setLastSeen] = useState('')
    const [roomPassword, setRoomPassword] = useState('')
    const [accessDenied, setAccessDenied] = useState(true)


    const scrollToBottom = () => {
        let element = document.getElementById("scrollToBottomDiv")
        element.scrollTop = 0
    }

    
    useEffect(() => {
        if(roomId) {
            const inputPassword = prompt("Enter Password")

            db.collection("rooms")
                .doc(roomId)
                .get()
                .then((doc) => {
                    if(doc.exists) {
                        setRoomPassword(doc.data().password)

                        if(inputPassword === roomPassword) {
                            setAccessDenied(false)

                            db.collection("rooms")
                                .doc(roomId)
                                .onSnapshot((snapshot) => (
                                    setRoomName(snapshot.data().name)
                                ))
                
                            db.collection("rooms")
                                .doc(roomId)
                                .collection("messages")
                                .orderBy('timestamp', 'desc')
                                .onSnapshot((snapshot) => {
                                    setMessages(snapshot.docs.map((doc) => (
                                        doc.data()
                                    )))
                                })

                            scrollToBottom()
                        }else {
                            setAccessDenied(true)
                        }
                    }
                })
        }

    }, [roomId, roomPassword])


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])



    useEffect(() => {

        if(!accessDenied) {
            const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            const monthNames = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            
            let lastOtherPersonMsg = messages.find((message) => message.name !== state.user.displayName)

            let dateObj = new Date(lastOtherPersonMsg?.timestamp?.toDate())
            
            let lastSeenString = `last seen at ${dateObj.getHours()}:${dateObj.getMinutes()} on ${weekNames[dateObj.getDay()]}, ${dateObj.getDate()} ${monthNames[dateObj.getMonth()]}` 

            setLastSeen(lastSeenString)
        }
        
    }, [messages, state.user.displayName, accessDenied])


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
        scrollToBottom()
    }



    return !accessDenied ? (
        <div className="chat">
            <div className="chat__headerContainer">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>{lastSeen}</p>
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

            <div className="chat__bodyContainer" id="scrollToBottomDiv">
                {
                    messages.map(({name, text, timestamp}) => (
                        <div
                            key={timestamp} 
                            className={`chat__message ${name === state.user.displayName && "chat__messageSent"}`}
                        >
                            {name !== state.user.displayName && <p className="chat__messageUser">{name}</p>}
                            {text}
                            <p className="chat__messageTimestamp">
                                {
                                    new Date(timestamp?.toDate()).toUTCString().replace("GMT", "").slice(0,-4)
                                }
                            </p>
                        </div>
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
    ) : (
        <NoChat 
            headerText="Wrong Password" 
            paraText="Ask the person who created the room for the correct password."  
        />
    )
}

export default Chat
