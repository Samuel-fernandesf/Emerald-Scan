import React, { useState, useEffect } from 'react';

import { View, Image, StyleSheet } from 'react-native';

const AURA_FRAMES = [
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__01.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__02.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__03.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__04.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__05.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__06.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__07.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__08.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__09.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__10.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__11.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__12.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__13.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__14.png'),
    require('../../assets/images/sprites/hero/x1000/green-lantern_1000x__15.png'),
];

function RingAuraAnimation({ isScanning }) {
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        let timer;

        if (isScanning) {
            timer = setInterval(() => {
                setCurrentFrame(
                    (prevFrame) => (prevFrame + 1) % AURA_FRAMES.length
                );
            }, 60);
        } else {
            setCurrentFrame(0);
        }

        return () => clearInterval(timer);
    }, [isScanning]);

    return (
        <View style={styles.container}>
            <Image
                source={AURA_FRAMES[currentFrame]}
                style={styles.heroSprite}
                resizeMode="contain"
            />
        </View>
    );
}

export default RingAuraAnimation;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },

    heroSprite: {
        width: 220,
        height: 220,
    },
});