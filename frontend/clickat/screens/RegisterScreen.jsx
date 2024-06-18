import React, {useState} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styles} from "./loginStyles";

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [hashed_password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        try {
            const response = await fetch('http://192.168.51.231:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, hashed_password}),
            });

            if (response.status === 200) {
                navigation.navigate('Login');
            }

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            {/*<Image source={require('./logo.png')} style={styles.logo}/>*/}
            <Text style={styles.title}>Регистрация</Text>
            <TextInput
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholder="Имя пользователя"
                style={styles.input}
            />
            <TextInput
                value={hashed_password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Пароль"
                secureTextEntry={true}
                style={styles.input}
            />
            <Button title="Зарегистрироваться" onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </Button>
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Уже есть аккаунт?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;