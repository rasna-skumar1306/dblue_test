import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
	apiKey: "API_KEY",
	authDomain: "Domain_name",
	databaseURL: "DATABASE_URL",
	projectId: "ID",
	storageBucket: "STORAGE_URL",
	messagingSenderId: "SENDER_ID",
	appId: "APP_ID",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
