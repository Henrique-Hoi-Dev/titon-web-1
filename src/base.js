import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// const { 
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGEBUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
//   MEASUREMENT_ID
// } = process.env
// console.log("strings de firebase", API_KEY)

const firebaseConfig = {
  apiKey: "AIzaSyATCdFr65iB-wUjo0twMlChSzseAv6rp8U",
  authDomain: "rickotech-img.firebaseapp.com",
  projectId: "rickotech-img",
  storageBucket: "rickotech-img.appspot.com",
  messagingSenderId: "8293119699",
  appId: "1:8293119699:web:60b48e09c0f5900fcf0626",
  measurementId: "G-Z57Z9K28BW"

  // apiKey: API_KEY,
  // authDomain: AUTH_DOMAIN,
  // projectId: PROJECT_ID,
  // storageBucket: STORAGEBUCKET,
  // messagingSenderId: MESSAGING_SENDER_ID,
  // appId: APP_ID,
  // measurementId: MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage  = getStorage(app);
