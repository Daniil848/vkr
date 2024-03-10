// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC8ME5zURpa1iUJ4Ic4WnAOY2ry5fWkewU',
  authDomain: 'vkrdb-fb079.firebaseapp.com',
  projectId: 'vkrdb-fb079',
  storageBucket: 'vkrdb-fb079.appspot.com',
  messagingSenderId: '751766702903',
  appId: '1:751766702903:web:bc23c8c63239a949f9e8b2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
