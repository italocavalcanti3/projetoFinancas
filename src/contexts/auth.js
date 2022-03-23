import React, { createContext, useState } from "react";
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
    async function signUp(nome, email, password){
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome,
                email: email
            }).then( () => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: email
                };
                setUser(data);
            });
        });
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;