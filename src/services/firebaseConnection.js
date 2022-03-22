import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
    apiKey: "AIzaSyBNk-sW_sk4IHEXEmwghOBfMtn81q1_Bew",
    authDomain: "projeto-financas-33898.firebaseapp.com",
    projectId: "projeto-financas-33898",
    storageBucket: "projeto-financas-33898.appspot.com",
    messagingSenderId: "284728155384",
    appId: "1:284728155384:web:d7cee0fe7c5103942a6f0d"
  };

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
