import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3CMfc6mzF4Um27yoiweKL5XyiR75IdgM",
  authDomain: "mealstogo-51d3e.firebaseapp.com",
  projectId: "mealstogo-51d3e",
  storageBucket: "mealstogo-51d3e.appspot.com",
  messagingSenderId: "7350965721",
  appId: "1:7350965721:web:4ea1e5e6b4514b0c3875c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;
