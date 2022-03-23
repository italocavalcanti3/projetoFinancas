import React, {useState} from 'react';
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
        LinkText } from '../SignIn/styles';

        
export default function SignUp() {
            
    const navigation = useNavigation();

    const [nome, setNome] = useState('');
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
          placeholder='Nome'
          autoCorrect={false}
          autoCapitalize='none'
          value={nome}
          onChangeText={ (texto) => setNome(texto) }
          />
        </AreaInput>

        <AreaInput>
          <Input 
          placeholder='E-mail'
          autoCorrect={false}
          autoCapitalize='none'
          value={email}
          onChangeText={ (texto) => setEmail(texto) }
          />
        </AreaInput>

        <AreaInput>
          <Input 
          placeholder='Senha'
          autoCorrect={false}
          autoCapitalize='none'
          value={password}
          onChangeText={ (texto) => setPassword(texto) }
          />
        </AreaInput>

        <SubmitButton>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link
        onPress={ () => navigation.navigate('SignIn') }>
          <LinkText>Crie uma conta</LinkText>
        </Link>

       </Container>
   </Background>
  );
}