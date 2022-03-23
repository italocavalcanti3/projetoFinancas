import React, {useRef, useState, useContext} from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, 
        Container, 
        Logo, 
        AreaInput, 
        Input, 
        SubmitButton, 
        SubmitText, 
        Link, 
        LinkText } from './styles';
import { AuthContext } from '../../contexts/auth';
        
export default function SignIn() {
          
  const passwordRef = useRef();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 return (
   <Background>
       <Container
       behavior={Platform.OS === 'ios' ? 'padding' : ''}
       enabled
       >

        <Logo source={require('../../assets/Logo.png')} />

        <AreaInput>
          <Input 
          placeholder='E-mail'
          autoCorrect={false}
          autoCapitalize='none'
          value={email}
          returnKeyType='next'
          onSubmitEditing={ () => passwordRef.current.focus() }
          blurOnSubmit={false}
          onChangeText={ (texto) => setEmail(texto) }
          />
        </AreaInput>

        <AreaInput>
          <Input 
          placeholder='Senha'
          autoCorrect={false}
          autoCapitalize='none'
          value={password}
          ref={passwordRef}
          onChangeText={ (texto) => setPassword(texto) }
          />
        </AreaInput>

        <SubmitButton>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link
        onPress={ () => navigation.navigate('SignUp') }>
          <LinkText>Crie uma conta</LinkText>
        </Link>

       </Container>
   </Background>
  );
}