import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyDbDKwYS3LZFFsf2UtRI86Qp0oIOAhCfN0",
    authDomain: "whatsapp-clone-619.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-619.firebaseio.com",
    projectId: "whatsapp-clone-619",
    storageBucket: "whatsapp-clone-619.appspot.com",
    messagingSenderId: "486893621818",
    appId: "1:486893621818:web:023a3c5d28387bd3a61b03",
    measurementId: "G-RY4R61C1F9"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)


const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()


export { db, auth, provider }
