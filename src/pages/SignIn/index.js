import React, {useRef, useState, useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
import { Platform } from 'react-native';
import Loading from '../../components/Loading';
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
        
export default function SignIn() {
          
  const passwordRef = useRef();
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn(){
    setLoading(true);
    signIn(email, password);
    setLoading(false);
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

        <SubmitButton onPress={handleSignIn}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link
        onPress={ () => navigation.navigate('SignUp') }>
          <LinkText>Crie uma conta</LinkText>
        </Link>

        {
          loading ? <Loading /> : null
        }

       </Container>
   </Background>
  );
}