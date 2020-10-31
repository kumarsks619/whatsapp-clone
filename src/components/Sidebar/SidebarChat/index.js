import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { db } from '../../../assets/firebase'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import './SidebarChat.css'




function SidebarChat({ addNewChat, id, name }) {

    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState('')


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    useEffect(() => {
        if(id) {
            db.collection("rooms")
                .doc(id)
                .collection("messages")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setMessages(snapshot.docs.map((doc) => (
                        doc.data()
                    )))
                })
        }
    }, [id])

    const createNewChat = () => {
        const roomName = prompt("Enter name for the Chat Room")

        if(roomName) {
            db.collection("rooms").add({
                name: roomName
            })
        }
    }


    return addNewChat ? (
            <IconButton 
                className="sidebarChat__addNewBtn"
                onClick={createNewChat}
            >
                <AddIcon/>
            </IconButton>
    ) : (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__infoContainer">
                    <h2>{name}</h2>
                    <p>{messages[0]?.text}</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
