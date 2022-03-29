import React, { useState, useRef } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Header from '../../components/Header';
import Picker from '../../components/Picker/index.android';
import { Background, Input, SubmitButton, SubmitText } from './style';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';


export default function Registrar() {
  const pickerRef = useRef(null);
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  function handleSubmit(){
    Keyboard.dismiss();
    if (isNaN(parseFloat(valor)) || tipo === null) {
      alert('Preencha todos os campos.');
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `${tipo.toUpperCase()} - R$ ${parseFloat(valor).toFixed(2)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    );

  }

  async function handleAdd(){
    setLoading(true);
    let uid = await firebase.auth().currentUser.uid;
    let key = await firebase.database().ref('historico').child(uid).push().key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yyyy')
    });

    //Atualizar o saldo
    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === 'despesa' ?
      saldo -= parseFloat(valor) : saldo += parseFloat(valor)

      user.child('saldo').set(saldo);

    });
    Keyboard.dismiss();
    setValor('');
    navigation.navigate('Home');
    setLoading(false);
  }

  if (loading) {
    return <Loading />
  }

  return (
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
      <Background>
        <Header />

        <SafeAreaView style={{ alignItems: 'center' }}>

          <Input
          placeholder='Valor desejado'
          keyboardType='numeric'
          returnKeyType='next'
          ref={pickerRef}
          value={valor}
          onChangeText={ (valor) => setValor(valor) }
          />

          <Picker
          onChange={setTipo}
          tipo={tipo}
          />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}