import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import GameScreen from './screens/GameScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const App = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('token').then((token) => {
            if (token) {
                setToken(token);
            }
        });
    }, []);

    if (token) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Game" component={GameScreen} options={{ headerLeft: null }}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerLeft: null }}/>
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerLeft: null }}/>
                    <Stack.Screen name="Game" component={GameScreen} options={{ headerLeft: null }}/>

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};


export default App;