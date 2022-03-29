import React, { useContext, useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import { Background, Container, Nome, Saldo, Title, Lista, Area } from './style';
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import Loading from '../../components/Loading';
import { format, isBefore } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '../../components/DatePicker';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {

    async function loadList(){
      await firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico')
      .child(user.uid)
      .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
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

  }, [newDate]);

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

  function handleShowPicker(){
    setShow(true);
  }

  function handleClose(){
    setShow(false);
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
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

      <Area>
      <TouchableOpacity onPress={handleShowPicker}>
        <Icon name='event' color="#FFF" size={30} />
      </TouchableOpacity>
      <Title>Últimas movimentações</Title>
      </Area>
      <Lista 
      keyExtractor={ item => item.key }
      showsVerticalScrollIndicator={false}
      data={historico}
      renderItem={ ({ item }) => ( <HistoricoList data={item} deteleItem={handleDelete} /> )}
      />

      {
        show && (
          <DatePicker
          onClose={handleClose}
          onChange={onChange}
          date={newDate}
          />
      )}
    </Background>
  );
}