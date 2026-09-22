import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import Colors from '../constants/colors';

import { calculateStars } from '../utils/numbers';

import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

// Situações de emergência para resgate
const DISCOVERIES = [
  {
    name: 'NAVE EM CHAMAS RESGATADA!',
    description:
      'Sinal de socorro localizado a tempo! A tripulação foi salva com sucesso das chamas.',
    image: require('../assets/images/sprites/ship.png'),
  },
  {
    name: 'ENTIDADE MOGO LOCALIZADA!',
    description:
      'O planeta consciente enviou um pedido de ajuda e foi protegido do perigo.',
    image: require('../assets/images/sprites/planet.png'),
  },
];

function GameOverScreen({
  roundsCount,
  userNumber,
  maxRange,
  bestRounds,
  onStartNewGame,
}) {
  const [discovery] = useState(
    () => DISCOVERIES[Math.floor(Math.random() * DISCOVERIES.length)]
  );

  const stars = calculateStars(roundsCount, maxRange);

  return (
    <View style={styles.screen}>
      <Title>MISSÃO DE RESGATE CONCLUÍDA!</Title>

      <Text style={styles.subtitle}>
        SETOR {userNumber} ALCANÇADO
      </Text>

      <View style={styles.imageContainer}>
        <Image
          source={discovery.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.discoveryName}>
        {discovery.name}
      </Text>

      <Text style={styles.discoveryDescription}>
        {discovery.description}
      </Text>

      <View style={styles.starsContainer}>
        {[1, 2, 3].map((starIndex) => (
          <Text
            key={starIndex}
            style={[
              styles.starText,
              {
                color:
                  starIndex <= stars
                    ? Colors.goldStar
                    : Colors.textMuted,
              },
            ]}
          >
            ★
          </Text>
        ))}
      </View>

      <Text style={styles.summaryText}>
        O Guardião realizou{' '}
        <Text style={styles.highlight}>
          {roundsCount}
        </Text>{' '}
        varreduras para concluir o resgate.
      </Text>

      {bestRounds !== null && (
        <Text style={styles.recordText}>
          Melhor resultado:{' '}
          <Text style={styles.highlight}>
            {bestRounds} rodadas
          </Text>
        </Text>
      )}

      <PrimaryButton
        style={styles.button}
        onPress={onStartNewGame}
      >
        PRÓXIMA MISSÃO
      </PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 10,
  },

  imageContainer: {
    width: 180,
    height: 180,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  discoveryName: {
    color: Colors.greenNeon,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 5,
  },

  discoveryDescription: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 15,
    lineHeight: 16,
  },

  starsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  starText: {
    fontSize: 32,
    marginHorizontal: 4,
  },

  summaryText: {
    color: Colors.textLight,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },

  recordText: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
  },

  highlight: {
    color: Colors.greenNeon,
    fontWeight: 'bold',
  },

  button: {
    minWidth: '60%',
  },
});