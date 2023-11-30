// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { 
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, orderBy
    } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUH1-koCIfdajYGaXBAjm4fJ-_Mgj8kmI",
    authDomain: "marinemaniadb.firebaseapp.com",
    projectId: "marinemaniadb",
    storageBucket: "marinemaniadb.appspot.com",
    messagingSenderId: "526955666666",
    appId: "1:526955666666:web:3ac08446134e27567ccb93"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

const scoresCollection = collection(db, 'scores'); //get scores collection from database

const q = query(scoresCollection, orderBy('score', 'desc'));

window.userScores = [];

onSnapshot(q, (snapshot) => {
    window.userScores.length = []; //empty out array before adding all scores again

    snapshot.docs.forEach(doc => {
        window.userScores.push({...doc.data(), id: doc.id});
    });
});

//adds a new username, score object to the firestore collection
function AddToScoresCollection(username, score){
    addDoc(scoresCollection, {
        'username': username,
        'score': score,
    });
}

window.AddToScoresCollection = AddToScoresCollection; //make global function so can be called inside main.js