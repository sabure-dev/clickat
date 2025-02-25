import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cat from '../components/Cat';

const Loading = ({navigation}) => {
    // const [clicks, setClicks] = useState(0);
    // const [catLevel, setCatLevel] = useState(1);
    // const [requiredClicks, setRequiredClicks] = useState(10);

    useEffect(() => {
        // Load data from DB when the component mounts
        loadProgress();

    }, []);

    // const handleCatTap = () => {
    //     setClicks(clicks + 1);
    //     if ((clicks + 1 >= requiredClicks) && (clicks !== 1)) {
    //         setCatLevel(catLevel + 1);
    //         saveLvl();
    //
    //         setRequiredClicks(requiredClicks + (catLevel + 1) * 10);
    //
    //     }
    //     saveClicks();
    // };

    const loadProgress = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response2 = await fetch('https://clickat.onrender.com/api/cat/', {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}`,
                },
            });

            if (response2.status !== 200) {
                console.log(response2.status)
                console.log('redirect to login')
                navigation.navigate('Login');
            }
            else {
                navigation.navigate('Game')
            }

        } catch (error) {
            console.error(error);
        }
    };

    // const saveClicks = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         const response = await fetch('http://127.0.0.1:8000/api/cat/clicks', {
    //             method: 'PUT',
    //             headers: {
    //                 'Authorization': `bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 "clicks": clicks + 1,
    //             })
    //         });
    //
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const saveLvl = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         const response = await fetch('http://127.0.0.1:8000/api/cat/lvl', {
    //             method: 'PUT',
    //             headers: {
    //                 'Authorization': `bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 "lvl": catLevel + 1,
    //                 "required_clicks": requiredClicks + (catLevel + 1) * 10,
    //             })
    //         });
    //
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                    Loading...
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Loading;