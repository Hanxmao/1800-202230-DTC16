//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyC1X4r_TKjSOMFAzpFeIDTSl9wrYKJOQ10",
    authDomain: "comp1800-202230-dtc16.firebaseapp.com",
    projectId: "comp1800-202230-dtc16",
    storageBucket: "comp1800-202230-dtc16.appspot.com",
    messagingSenderId: "469001480013",
    appId: "1:469001480013:web:4af3bdfd5632920ff23904"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// every page link this js file, so user can call signOut function in anywhere whithin the website
signOut= ()=>{firebase.auth().signOut()}