import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

const Cat = ({onClick}) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <Image
                source={require('../assets/cat.jpg')}
                style={{width: 200, height: 200}}
            />
        </TouchableOpacity>
    );
};

export default Cat;