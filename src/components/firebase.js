import * as firebase from 'firebase';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAK6wE0d3-118stGh3g7FjCrksl9NKPS_w",
    authDomain: "project-lms-874a6.firebaseapp.com",
    databaseURL: "https://project-lms-874a6.firebaseio.com",
    projectId: "project-lms-874a6",
    storageBucket: "project-lms-874a6.appspot.com",
    messagingSenderId: "826913385943",
    appId: "1:826913385943:web:16ac79a6dc13228e47af92",
    measurementId: "G-C0XKC6WKME"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire;