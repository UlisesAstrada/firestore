import firebase from 'firebase'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAEhoCWssNX2LxiimC_jNlL-AlFwL16SfA",
  authDomain: "react-app-b75cf.firebaseapp.com",
  projectId: "react-app-b75cf",
  storageBucket: "react-app-b75cf.appspot.com",
  messagingSenderId: "541890713752",
  appId: "1:541890713752:web:9736ed57dd218901cd18ed",
  measurementId: "G-6BDKLMVZBW"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth()

export {auth}