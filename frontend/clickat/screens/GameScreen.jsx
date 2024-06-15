import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cat from '../components/Cat';

const GameScreen = () => {
    const [clicks, setClicks] = useState(0);
    const [catLevel, setCatLevel] = useState(1);
    const [requiredClicks, setRequiredClicks] = useState(10);


    useEffect(() => {
        // Load data from DB when the component mounts
        loadProgress();
    }, []);

    useEffect(() => {
        // Save data to DB when the state changes
        
        saveProgress();
    }, []);

    const handleCatTap = () => {
        setClicks(clicks + 1);

        if (clicks + 1 >= requiredClicks) {
            setCatLevel(catLevel + 1);


            setRequiredClicks(requiredClicks + (catLevel + 1) * 10);
        }
    };

    const loadProgress = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response2 = await fetch('http://127.0.0.1:8000/api/cat/', {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}`,
                },
            });

            const result = await response2.json();

            setClicks(result["user_clicks"]);
            setCatLevel(result["user_lvl"]);

        } catch (error) {
            console.error(error);
        }
    };

    const saveProgress = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch('http://127.0.0.1:8000/api/cat/', {
                method: 'PUT',
                headers: {
                    'Authorization': `bearer ${token}`,
                },
                body: {
                    "clicks": clicks,
                    "lvl": catLevel,
                }
            });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                    {clicks} Clicks
                </Text>
                <Text style={{fontSize: 18}}>
                    Cat Level: {catLevel}
                </Text>
            </View>
            <Cat onClick={handleCatTap}/>
        </SafeAreaView>
    );
};

export default GameScreen;