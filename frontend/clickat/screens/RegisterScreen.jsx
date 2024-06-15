import React, {useState} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [hashed_password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
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
        <View>
            <Text>Регистрация</Text>
            <TextInput
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholder="Имя пользователя"
            />
            <TextInput
                value={hashed_password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Пароль"
                secureTextEntry={true}
            />
            <Button title="Зарегистрироваться" onPress={handleRegister}/>
            {error && <Text style={{color: 'ed'}}>{error}</Text>}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text>Уже есть аккаунт?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;