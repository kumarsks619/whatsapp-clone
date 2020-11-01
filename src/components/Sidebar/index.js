import React, { useState, useEffect, useContext } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChat'
import { db } from '../../assets/firebase'
import { StateContext } from '../../ContextAPI'


 
function Sidebar() {

    const [state] = useContext(StateContext)

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection("rooms")
            .onSnapshot((snapshot) => (
                setRooms(snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        data: doc.data()
                    }
                )))
            ))
        return () => {
            unsubscribe()
        }
    }, [])


    return (
        <div className="sidebar">
            <div className="sidebar__headerContainer">
                <Avatar src={state.user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__searchContainer">
                <div className="sidebar__searchBox">
                    <SearchOutlinedIcon />
                    <input
                        type="text" 
                        placeholder="Search or start new chat"
                    />
                </div>
            </div>

            <div className="sidebar__chatsContainer">
                <SidebarChat addNewChat />
                {
                    rooms.length > 0 ? (
                        rooms.map((room) => (
                            <SidebarChat 
                                key={room.id}
                                id={room.id}
                                name={room.data.name}
                            />
                        ))
                    ) : (
                        <p className="sidebar__noRoomMsg">Create a Room to start a chat</p>
                    )
                }
            </div>
        </div>
    )
}

export default Sidebar
