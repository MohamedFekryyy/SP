import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDDom2k7txhPJNbEwMGV0wF_DqK3RznkA",
  authDomain: "swiftproposal-b29c2.firebaseapp.com",
  projectId: "swiftproposal-b29c2",
  storageBucket: "swiftproposal-b29c2.appspot.com",
  messagingSenderId: "471701919139",
  appId: "1:471701919139:web:a717e026caa4f770b6f616",
  measurementId: "G-M7S4G238VP"
};

const app = firebase.initializeApp(firebaseConfig);

// Initialize analytics only if window object is available
if (typeof window !== 'undefined') {
  const analytics = getAnalytics(app);
}

const auth = firebase.auth();

export { auth };
export default app;
