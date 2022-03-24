import React, {useRef, useState, useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';

import { Background,
        Container,
        Logo,
        AreaInput,
        Input,
        SubmitButton,
        SubmitText,
        Link,
        LinkText } from '../SignIn/styles';
        
export default function SignUp() {
            
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigation = useNavigation();
    const { signUp, loading } = useContext(AuthContext);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleSignUp(){
      signUp(nome, email, password);
    }

  return (
    <Background>
        <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        >

        <Logo source={require('../../assets/Logo.png')} />

        <AreaInput>
          <Input 
          placeholder='Nome'
          autoCorrect={false}
          autoCapitalize='none'
          value={nome}
          returnKeyType='next'
          onSubmitEditing={ () => emailRef.current.focus() }
          blurOnSubmit={false}
          onChangeText={ (texto) => setNome(texto) }
          />
        </AreaInput>

        <AreaInput>
          <Input 
          placeholder='E-mail'
          autoCorrect={false}
          autoCapitalize='none'
          value={email}
          ref={ emailRef }
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
          ref={ passwordRef }
          onChangeText={ (texto) => setPassword(texto) }
          />
        </AreaInput>

        <SubmitButton
        onPress={handleSignUp}
        >
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link
        onPress={ () => navigation.navigate('SignIn') }>
          <LinkText>Crie uma conta</LinkText>
        </Link>

        {
          loading ? <Loading /> : null
        }
        
        </Container>
    </Background>
  );
}