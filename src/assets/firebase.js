import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyCS-bEnMqdSOU0muHU0LkTYnaxXqI0kL0k",
    authDomain: "whatsapp-clone-a0029.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-a0029.firebaseio.com",
    projectId: "whatsapp-clone-a0029",
    storageBucket: "whatsapp-clone-a0029.appspot.com",
    messagingSenderId: "22709525211",
    appId: "1:22709525211:web:6eaf0b45454d5d92a04afe",
    measurementId: "G-RDDGFTXYSF"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)


const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()


export { db, auth, provider }
