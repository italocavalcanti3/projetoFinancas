import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import { Background, Container, Nome, Saldo, Title, Lista } from './style';
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import { format, isBefore } from 'date-fns';
import Loading from '../../components/Loading';
import { Alert } from 'react-native';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    async function loadList(){
      await firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico')
      .child(user.uid)
      .orderByChild('date').equalTo(format(new Date, 'dd/MM/yyyy'))
      .limitToLast(10)
      .on('value', (snapshot) => {
        
        setHistorico([]);
        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            date: childItem.val().date,
          };
          setHistorico(oldArray => [...oldArray, list]);
        });

      });

    }

    loadList();

  }, []);

  function handleDelete(data){
    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);

    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);

    if (isBefore(dateItem, dateHoje)) {
      alert('Você não pode excluir um registro antigo.');
      return;
    }
    Alert.alert(
      'Confirmar exclusão',
      'Deseja excluir este item?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    );
  }

  async function handleDeleteSuccess(data) {
    setLoading(true);
    await firebase.database().ref('historico')
    .child(user.uid).child(data.key).remove()
    .then( async () => {
      let saldoAtual = saldo;
      data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);
      await firebase.database().ref('users')
      .child(user.uid).child('saldo').set(saldoAtual)
      .catch((error) => {
        console.log(error.code);
        setLoading(false);
      });
    });
    setLoading(false);
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{ user && user.nome }</Nome>
        <Saldo>R$ { saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') }</Saldo>
      </Container>

      <Title>Últimas movimentações</Title>
      <Lista 
      keyExtractor={ item => item.key }
      showsVerticalScrollIndicator={false}
      data={historico}
      renderItem={ ({ item }) => ( <HistoricoList data={item} deteleItem={handleDelete} /> )}
      />
    </Background>
  );
}