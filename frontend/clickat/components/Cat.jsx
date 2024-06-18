import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cat = ({onClick}) => {
    const [activeSkin, setActiveSkin] = useState('cat_default');

    useEffect(() => {

            getActiveSkin();
    }, []);

    const getActiveSkin = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`http://192.168.51.231:8000/api/skin/active`, {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}`,
                },
            });

            const result = await response.json()

            setActiveSkin(result)

        } catch (error) {

            console.error(error);
        }
    }

    return (
        <TouchableOpacity onPress={onClick}>
            <Image
                source={{uri: `http://192.168.51.231:8000/api/static/${activeSkin}.jpg`}}
                style={{width: 200, height: 200, borderRadius: 10}}
            />
        </TouchableOpacity>
    );
};

export default Cat;