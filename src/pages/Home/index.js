import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import { Background, Container, Nome, Saldo, Title, Lista } from './style';
import HistoricoList from '../../components/HistoricoList';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [historico, setHistorico] = useState([
    {key: '1', tipo: 'receita', valor: 1200},
    {key: '2', tipo: 'despesa', valor: 200},
    {key: '3', tipo: 'receita', valor: 40},
    {key: '4', tipo: 'receita', valor: 89.62},
  ]);

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{ user && user.nome }</Nome>
        <Saldo>{ user && user.saldo }</Saldo>
      </Container>

      <Title>Últimas movimentações</Title>
      <Lista 
      keyExtractor={ item => item.key }
      showsVerticalScrollIndicator={false}
      data={historico}
      renderItem={ ({ item }) => ( <HistoricoList data={item} /> )}
      />
    </Background>
  );
}