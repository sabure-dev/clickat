import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Loading from './screens/Loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import GameScreen from "./screens/GameScreen";

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
                    <Stack.Screen name="Loading" component={Loading} options={{headerShown: false}}/>
                    <Stack.Screen name="Game" component={GameScreen} options={{headerShown: false}}/>

                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Loading">
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Loading" component={Loading} options={{headerShown: false}}/>
                    <Stack.Screen name="Game" component={GameScreen} options={{headerShown: false}}/>


                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};


export default App;