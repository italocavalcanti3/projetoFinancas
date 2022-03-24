import Reat from 'react';
import { ActivityIndicator } from 'react-native';
import { Background, Container } from '../../pages/SignIn/styles';

export default function Loading(){
    return(
        <Background>
            <Container>
                <ActivityIndicator color='#00b94a' size={80}  />
            </Container>
        </Background>
    );
}