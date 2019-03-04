import {initializeApp} from 'firebase';

const app= initializeApp({
    apiKey: "AIzaSyC8vA59cxdG2Fp5foOKeWa_hLf9oc05PeI",
    authDomain: "personalwebsite-39a05.firebaseapp.com",
    databaseURL: "https://personalwebsite-39a05.firebaseio.com",
    projectId: "personalwebsite-39a05",
    storageBucket: "personalwebsite-39a05.appspot.com",
    messagingSenderId: "411238984908"
});

app.firestore().settings({
   timestampsInSnapshots:true
});



export const db= app.firestore();
//exporting the database
export const auth= app.auth();
//exporting auth 
export const storage= app.storage();
//exporting the storage sdk
