import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { View, Text } from 'react-native';

export default function Home() {
  const { user } = useContext(AuthContext);

 return (
   <View>
       <Text>{ user && user.nome }</Text>
   </View>
  );
}