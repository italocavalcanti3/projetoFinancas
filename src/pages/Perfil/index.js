import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Container, Nome, NewLink, NewText, Logout, LogoutText } from './styles';
import Loading from '../../components/Loading';
import Header from '../../components/Header';

export default function Perfil() {
    const { user, signOut, loading, handleNavigation } = useContext(AuthContext);

    if(loading) {
        return <Loading />
    }

    return (
    <Container>
        <Header />
        <Nome>{user && user.nome}</Nome>
        <NewLink onPress={() => handleNavigation('Registrar')}>
            <NewText>Registrar gastos</NewText>
        </NewLink>
        <Logout onPress={() => signOut()}>
            <LogoutText>Sair</LogoutText>
        </Logout>
    </Container>
);
}