import React from 'react'
import './NoChat.css'
import LaptopMacIcon from '@material-ui/icons/LaptopMac'


function NoChat() {
    return (
        <div className="noChat">
            <div className="noChat__container">
                <img
                    src="https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg"
                    alt="no-chat-pic"
                />
                <h1>Open a Chat Room</h1>
                <p>
                    WhatsApp Clone connects through Google account and to start a chat with someone, you have
                    to create a Chat Room first 
                </p>
                <p className="noChat__lastP">
                    <LaptopMacIcon/>&nbsp; 
                    WhatsApp Clone is not available for Phone.
                </p>
            </div>
        </div>
    )
}

export default NoChat
