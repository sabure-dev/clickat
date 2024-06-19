import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    AppRegistry,
    FlatList,
    RefreshControl,
    ScrollView
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cat from '../components/Cat';
import RNRestart from 'react-native-restart';
import { useInterval } from 'usehooks-ts'

const GameScreen = ({navigation}) => {
    const [clicks, setClicks] = useState(0);
    const [catLevel, setCatLevel] = useState(1);
    const [requiredClicks, setRequiredClicks] = useState(10);
    const [remainClicks, setRemainClicks] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Load data from DB when the component mounts
        loadProgress();

    }, []);

    useInterval(() => {
        const upd = (clicks + 0.1).toFixed(1)
        setClicks(parseFloat(upd));
        saveClicks(0.1)
    }, 10000);

    const onRefresh = () => {
        RNRestart.restart();
    };

    const handleCatTap = () => {

        setClicks(clicks + 10);
        if ((clicks + 1 >= requiredClicks) && (clicks !== 1)) {
            setCatLevel(catLevel + 1);
            saveLvl();

            setRequiredClicks(requiredClicks + (catLevel + 1) * 10);

            setRemainClicks((requiredClicks + (catLevel + 1) * 10) - (clicks) - 1);

        } else {
            setRemainClicks(remainClicks - 1);
        }
        saveClicks(1);
    };

    const loadProgress = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response2 = await fetch('https://clickat.onrender.com/api/cat/', {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}`,
                },
            });

            const result = await response2.json();

            if (response2.status !== 200) {
                navigation.navigate('Login');
            }

            setClicks(result["user_clicks"]);
            setCatLevel(result["user_lvl"]);
            setRequiredClicks(result["user_required_clicks"]);
            setRemainClicks(result["user_required_clicks"] - result["user_clicks"]);

        } catch (error) {
            console.error(error);
        }
    };

    const saveClicks = async (add) => {
        try {
            const upd = (clicks + 0.1).toFixed(1)
        setClicks(parseFloat(upd));
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('https://clickat.onrender.com/api/cat/clicks', {
                method: 'PUT',
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "clicks": parseFloat((clicks + add).toFixed(1)),
                })
            });

            if (response.status === 401) {
                setError('Please log in again!')
            }

        } catch (error) {
            console.error(error, 'a');
        }
    };

    const saveLvl = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('https://clickat.onrender.com/api/cat/lvl', {
                method: 'PUT',
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "lvl": catLevel + 1,
                    "required_clicks": requiredClicks + (catLevel + 1) * 10,
                })
            });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
                <Text>
                    {remainClicks} осталось до {catLevel + 1} уровня
                </Text>

                <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                    {clicks} Кликов
                </Text>
                <Text style={{fontSize: 18, marginBottom: 10}}>
                    Уровень котика: {catLevel}
                </Text>
            </View>
            <Cat onClick={handleCatTap}/>
            <View style={{marginTop: 20}}>
                <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('Shop')}>
                    <Text style={styles.shopButtonText}>Магазин</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onRefresh}>
                <Text>🔄</Text>
            </TouchableOpacity>
            {error && <Text style={{color: 'red'}}>{error}</Text>}
        </SafeAreaView>
    );
};

const styles = {
    shopButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 10,
    },
    shopButtonText: {
        fontSize: 16,
        color: '#fff',
    },
};

export default GameScreen;