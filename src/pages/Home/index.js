import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { View, Text, Button } from 'react-native';

export default function Home() {
  const { user, signOut } = useContext(AuthContext);

 return (
   <View>
       <Text>{ user && user.nome }</Text>
       <Text>{ user && user.email }</Text>
       <Button 
       title='Deslogar'
       onPress={ () => signOut() }
       />
   </View>
  );
}