import * as firebase from "firebase";
import {firebaseConfig} from "@/firebaseConfig";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const facebook = new firebase.auth.FacebookAuthProvider();
const google = new firebase.auth.GoogleAuthProvider();
export {auth, facebook, google}
