import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import './Login.css'
import { auth, provider } from '../../assets/firebase'
import { StateContext } from '../../ContextAPI'


function Login() {

    const [ , dispatch] = useContext(StateContext) 

    const handleSignIn = () => {
        auth.signInWithPopup(provider)
            .then((response) => {
                dispatch({
                    type: 'SET_USER',
                    payload: response.user
                })
            })
            .catch((error) => alert(error.message))
    }


    return (
        <div className="login">
            <div className="login__container">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png"
                    alt="whatsapp-logo"
                />

                <div className="login__text">
                    <h2>Sign in to WhatsApp</h2>
                </div>

                <Button onClick={handleSignIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
