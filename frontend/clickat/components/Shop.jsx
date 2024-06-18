import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";

const Shop = () => {
    const [skinsStorage, setSkinsStorage] = useState([]);
    const [error, setError] = useState(null);
    const [userSkins, seetUserSkins] = useState('')


    useEffect(() => {
        getSkins();
        setUserSkins();
    }, []);

    const getSkins = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('https://clickat.onrender.com/api/skin', {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}`,
                },
            });

            const result = await response.json();
            setSkinsStorage(result);

        } catch (error) {
            console.error(error);
        }
    }

    const buySkin = async (name) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`https://clickat.onrender.com/api/skin/buy/${name}`, {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${token}`,
                },
            });

            if (response.status === 400) {
                setError('Not enough clicks!')
            } else {
                setError(null);
                setUserSkins();
            }

        } catch (error) {

            console.error(error);
        }
    }

    const equip = async (name) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`https://clickat.onrender.com/api/skin/${name}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `bearer ${token}`,
                },
            });

            if (response.status === 400) {
                setError('You do not have that skin!')
            } else {
                setError(null);
                RNRestart.restart();

            }

        } catch (error) {

            console.error(error);
        }
    }

    const setUserSkins = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('https://clickat.onrender.com/api/skin/my', {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}`,
                },
            });

            let result = await response.json();
            result = result.toString()
            seetUserSkins(result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Магазин скинов для котиков</Text>
            {error && <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 10,
                paddingLeft: 20,
                color: 'red'
            }}>{error}</Text>}
            <FlatList
                data={skinsStorage}
                style={{height: 300}}
                renderItem={({item}) => (
                    <View style={styles.skinItem}>
                        <Image source={{uri: `http://192.168.51.231:8000/api/static/${item.image}`}}
                               style={styles.skinImageLarge}/>
                        <View style={{flex: 1, justifyContent: 'space-between'}}>
                            <Text style={styles.skinName}>{item.name}</Text>
                            <Text style={styles.skinPrice}>{item.price} кликов</Text>
                        </View>
                        {userSkins.includes(item.name) ? (
                            <TouchableOpacity style={styles.equipButton} onPress={() => equip(item.name)}>
                                <Text style={styles.buyButtonText}>Надеть</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.buyButton} onPress={() => buySkin(item.name)}>
                                <Text style={styles.buyButtonText}>Купить</Text>
                            </TouchableOpacity>
                        )
                        }
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
    buyButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    equipButton: {
        backgroundColor: '#4695c9',
        padding: 10,
        borderRadius: 5,
    },
    buyButtonText: {
        fontSize: 16,
        color: '#fff',
    },
};

export default Shop;