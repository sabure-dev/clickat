import React, {useState} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styles} from "./loginStyles";


const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            let formBody = [];
            const credentials = {"username": username, "password": password}
            for (let property in credentials) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(credentials[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            const response = await fetch('http://127.0.0.1:8000/api/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            });

            const token = await response.json();
            await AsyncStorage.setItem('token', token['access_token']);

            if (response.status === 200) {
                navigation.navigate('Game');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход</Text>
            <TextInput
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholder="Имя пользователя"
                style={styles.input}
            />
            <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Пароль"
                secureTextEntry={true}
                style={styles.input}
            />
            <Button title="Войти" onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Войти</Text>
            </Button>
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity onPress={() => {
                navigation.navigate('Register')
            }}>
                <Text style={styles.link}>Зарегистрироваться</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;