import React, { useMemo } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const STAR_TYPES = [
  require('../../assets/images/sprites/star/x1000/star__01.png'),
  require('../../assets/images/sprites/star/x1000/star__02.png'),
  require('../../assets/images/sprites/star/x1000/star__03.png'),
];

function BackgroundStars() {
  // Gera uma lista fixa de posições aleatórias para as estrelas não mudarem a cada render
  const starsList = useMemo(() => {
    const stars = [];
    const totalStars = 25; // Quantidade de estrelas no fundo

    for (let i = 0; i < totalStars; i++) {
      stars.push({
        id: i,
        // Sorteia qual dos 3 modelos usar
        image: STAR_TYPES[Math.floor(Math.random() * STAR_TYPES.length)],
        top: Math.random() * (height - 50),
        left: Math.random() * (width - 30),
        size: Math.floor(Math.random() * 12) + 12,
        opacity: Math.random() * 0.6 + 0.4,
      });
    }
    return stars;
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {starsList.map((star) => (
        <Image
          key={star.id}
          source={star.image}
          style={[
            styles.star,
            {
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            },
          ]}
          resizeMode="contain"
        />
      ))}
    </View>
  );
}

export default BackgroundStars;

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
  },
});