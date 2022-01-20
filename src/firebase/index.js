// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsS5HixpYIA8yn-ARBy_kJVcnRhac2Jug",
  authDomain: "fir-react-upload-e27ce.firebaseapp.com",
  projectId: "fir-react-upload-e27ce",
  storageBucket: "fir-react-upload-e27ce.appspot.com",
  messagingSenderId: "728434960137",
  appId: "1:728434960137:web:d949bc9314219febfa15d8",
  measurementId: "G-FS4E30CX73",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
//export Storage
const storage = getStorage(firebase);
export { storage, firebase as default };
