import React from 'react'
import './NoChat.css'
import LaptopMacIcon from '@material-ui/icons/LaptopMac'


function NoChat({ headerText, paraText }) {
    return (
        <div className="noChat">
            <div className="noChat__container">
                <img
                    src="https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg"
                    alt="no-chat-pic"
                />
                <h1>{headerText}</h1>
                <p>{paraText}</p>
                <p className="noChat__lastP">
                    <LaptopMacIcon/>&nbsp; 
                    WhatsApp Clone is not available for Phone.
                </p>
            </div>
        </div>
    )
}

export default NoChat
