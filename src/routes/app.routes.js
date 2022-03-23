import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';

const AppRoutes = createNativeStackNavigator();

function Home(){
    return(
        <AppRoutes.Navigator>
            <AppRoutes.Screen
            name='Home'
            component={Home}
            />
        </AppRoutes.Navigator>
    );
}

export default Home;