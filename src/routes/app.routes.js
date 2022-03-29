import React from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Registrar from '../pages/Registrar';
import Perfil from '../pages/Perfil';
import CustomDrawer from '../components/CustomDrawer';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
        <AppDrawer.Navigator
        drawerContent={ (props) => <CustomDrawer {...props} />}
        screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: '#131313',
            },
            drawerLabelStyle: {
                fontWeight: 'bold'
            },
            drawerActiveBackgroundColor: '#00b94a',
            drawerActiveTintColor: '#FFF',
            drawerInactiveBackgroundColor: '#000',
            drawerInactiveTintColor: '#DDD',
            drawerItemStyle: {
                marginVertical: 5,
            },
        }}
        
        
        >
            <AppDrawer.Screen
            name='Home'
            component={Home}
            />
            <AppDrawer.Screen
            name='Registrar'
            component={Registrar}
            />
            <AppDrawer.Screen
            name='Perfil'
            component={Perfil}
            />
        </AppDrawer.Navigator>
    );
}

export default AppRoutes;