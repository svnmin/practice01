


import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile, User } from "firebase/auth";
import { getDatabase } from "firebase/database";

import { adminUser } from "@/service/admin";



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

export interface Product{
    id? : string,
    title : string,
    price : string | number,
    option? : string,
    category? : string,
    colors? : string[],
    image? : string,
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase();

provider.setCustomParameters({
    prompt : 'select_account'
});


//google Login
export async function googleLogin() : Promise<User | null> {
    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user;
    }catch(error){
        console.error(error);
        return null;
    }
}

//google Logout
export async function googleLogout(){
    try{
        await signOut(auth);
    }catch(error){
        console.error(error);
    }
}

//maintain login state
export function onUserState(callback : (user : any) => void) : () => void {
    return onAuthStateChanged(auth, async(user) => {
        if(user){
            try{
                const updateUser = await adminUser(user)
                callback(updateUser)
            }catch(error){
                console.error(error);
                callback(user);
            }
        }else{
            callback(null)
        }
    })
}

//signin
export async function JoinEmail(email : string, password : string, name : string) {
    const auth = getAuth();
    try{
        const userData = await createUserWithEmailAndPassword(auth, email, password)
        const user = userData.user;
        await updateProfile(user,{
            displayName : name
        })
        await signOut(auth)
        return {success : true}
    }catch(error){
        console.error(error);
    }
}



export {database};