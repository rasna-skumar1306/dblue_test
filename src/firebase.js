import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
	apiKey: "AIzaSyAE82PcKoFZKwEajRJwnFXCJtcx14ca5w0",
	authDomain: "doodlebluetask.firebaseapp.com",
	databaseURL: "https://doodlebluetask.firebaseio.com",
	projectId: "doodlebluetask",
	storageBucket: "doodlebluetask.appspot.com",
	messagingSenderId: "579291075287",
	appId: "1:579291075287:web:2481fd155c90e6c0ca5692",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
