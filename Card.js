import * as React from 'react';
import {Image} from 'react-native';

export const Card = () => {
    return (
        <Image source={{
            uri: "https://img.scryfall.com/cards/normal/en/ths/180.jpg?1517813031"
        }}
        style= {{
            width: 146,
            height: 204,
        }}
        />
    )
}