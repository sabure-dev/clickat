import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";

const Leader = () => {
    const [leader, setLeader] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        getLeader();
    }, []);

    const getLeader = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('https://clickat.onrender.com/api/leaderboard/', {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}`,
                },
            });

            const result = await response.json();
            setLeader(result);

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Лучшие игроки</Text>
            {error && <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 10,
                paddingLeft: 20,
                color: 'red'
            }}>{error}</Text>}
            <FlatList
                data={leader}
                style={{height: 300}}
                renderItem={({item}) => (
                    <View style={styles.skinItem}>
                        <Image source={{uri: `https://clickat.onrender.com/api/static/${item.active_skin}.jpg`}}
                               style={styles.skinImageLarge}/>
                        <View style={{flex: 1, justifyContent: 'space-between'}}>
                            <Text style={styles.skinName}>{item.username}</Text>
                            <Text style={styles.skinPrice}>{item.lvl} уровень</Text>
                            <Text style={styles.skinPrice}>{item.clicks.toFixed(1)} кликов</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.name}
                scrollEnabled={true}
            />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingLeft: 20,
    },
    skinItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    skinImageLarge: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10,
    },
    skinName: {
        fontSize: 18,
    },
    skinPrice: {
        fontSize: 16,
        color: '#666',
    },
};

export default Leader;