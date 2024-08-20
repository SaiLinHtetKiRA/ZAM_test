import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import * as dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.Firebase_API,
  authDomain: process.env.Firebase_AuthDomain,
  projectId: process.env.projectId,
  storageBucket: "zoning-anime-myanmar.appspot.com",
  messagingSenderId: process.env.Firebase_MessagingSenderId,
  appId: process.env.Firebase_AppId,
  measurementId: process.env.Firebase_MeasurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
