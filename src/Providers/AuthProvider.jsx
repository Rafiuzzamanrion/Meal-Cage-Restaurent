import { useEffect, useState } from "react";
import { createContext } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.config";
import axios from "axios";
const provider = new GoogleAuthProvider();

export const AuthContext = createContext(null);
const auth = getAuth(app);





const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  const createUser = (email,password) =>{
    setLoading();
    return createUserWithEmailAndPassword(auth,email,password);
  };

  const logInUser = (email,password) => {
    setLoading();
    return signInWithEmailAndPassword(auth,email,password);
  };

  const logOut = () => {
    setLoading();
    return signOut(auth);
  };
  
  const updateUserProfile = (name,photo) =>{
    return updateProfile(auth.currentUser,{
      displayName:name, photoURL:photo
    })
  };

  const googleSignIn = () =>{
    setLoading();
    return signInWithPopup(auth,provider);
  }










  const authInfo = {
    user,
    loading,
    createUser,
    logInUser,
    logOut,
    updateUserProfile,
    googleSignIn,

  };

  useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth,currentUser =>{
        setUser(currentUser)
        // ===== get and set jwt =========
        // ======= using axios instead of fetch =======
        if(currentUser){
          axios.post(`${import.meta.env.VITE_API_BASE_URL}/jwt`,{email:currentUser.email,})
          .then(data =>{
            
            // ======= token is set to local storage ========
            localStorage.setItem('access-token',data.data.token)
            setLoading(false);
          })
        }
        else{
          localStorage.removeItem('access-token')
        }

    });
    return ()=>{
        return unsubscribe()
    }
  },[])

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
