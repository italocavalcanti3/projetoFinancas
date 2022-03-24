import React, { createContext, useState, useEffect } from "react";
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadingStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if (storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }

        loadingStorage();
    }, []);

    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    async function signIn(email, password){
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then( (snapshot) => {
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: snapshot.val().email,
                    saldo: snapshot.val().saldo
                };
                setUser(data);
                storageUser(data);
            });
        }).catch( (error) => console.log(error.code) );
    }

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
                storageUser(data);
            })
            .catch( (error) => console.log(error.code) );
        });
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, loading }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;