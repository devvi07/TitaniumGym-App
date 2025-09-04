import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../auth/LoginScreen';
import { Navigation } from './Navigation';
import { HomeScreen } from '../home/HomeScreen';
import { AddCliente } from '../clientes/AddCliente';
import { ClienteDetail } from '../clientes/ClienteDetail';
import { RegistrarMedidas } from '../clientes/RegistrarMedidas';



const Stack = createStackNavigator();
export const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Navigation"
                component={Navigation}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddCliente"
                component={AddCliente}
                options={{ 
                    headerShown: true,
                    title:'Agregar cliente',
                    headerStyle:{
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#B8860B',
                    //headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="ClienteDetail"
                component={ClienteDetail}
                options={{ 
                    headerShown: true,
                    title:'Detalle del cliente',
                    headerStyle:{
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#B8860B',
                    //headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="RegistrarMedidas"
                component={RegistrarMedidas}
                options={{ 
                    headerShown: true,
                    title:'Registrar nuevas medidas',
                    headerStyle:{
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#B8860B',
                    //headerTitleAlign: 'center',
                }}
            />
            
        </Stack.Navigator>
    )
}
