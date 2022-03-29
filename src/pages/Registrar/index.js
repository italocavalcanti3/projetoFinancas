import React, { useState, useRef } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../../components/Header';
import Picker from '../../components/Picker/index.android';
import { Background, Input, SubmitButton, SubmitText } from './style';

export default function Registrar() {
  const pickerRef = useRef(null);
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');

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

          <SubmitButton>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}