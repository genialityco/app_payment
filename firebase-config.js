import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDqKGsraeoUUnABLj2epLkSu5AyhwA5sGI",
  authDomain: "magnetic-be10a.firebaseapp.com",
  projectId: "magnetic-be10a",
  storageBucket: "magnetic-be10a.appspot.com",
  messagingSenderId: "105743648552",
  appId: "1:105743648552:web:9c969bf7f35942161f321d",
  databaseURL: "https://magnetic-be10a-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

export default app;
