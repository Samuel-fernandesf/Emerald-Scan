import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';

import RingAuraAnimation from '../components/game/RingAuraAnimation';
import GuessLogItem from '../components/game/GuessLogItem';

import PrimaryButton from '../components/ui/PrimaryButton';
import NumberContainer from '../components/game/NumberContainer';
import Title from '../components/ui/Title';

import { generateRandomBetween } from '../utils/numbers';

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, maxRange, onGameOver }) {
  const initialGuess = generateRandomBetween(
    1,
    maxRange + 1,
    userNumber
  );

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = maxRange;
  }, [maxRange]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [
    currentGuess,
    userNumber,
    onGameOver,
    guessRounds.length,
  ]);

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert(
        'Sinal Incompatível!',
        'Você sabe que essa instrução de varredura está incorreta.',
        [{ text: 'Corrigir', style: 'cancel' }]
      );

      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess - 1;
    } else {
      minBoundary = currentGuess + 1;
    }

    setIsScanning(true);

    setTimeout(() => {
      const newRandomNumber = generateRandomBetween(
        minBoundary,
        maxBoundary + 1,
        currentGuess
      );

      setCurrentGuess(newRandomNumber);

      setGuessRounds((prevRounds) => [
        newRandomNumber,
        ...prevRounds,
      ]);

      setIsScanning(false);
    }, 600);
  }

  return (
    <View style={styles.screen}>
      <Title>VARREDURA DE SETOR</Title>

      <RingAuraAnimation isScanning={isScanning} />

      <View style={styles.guessCard}>
        <Text style={styles.guessLabel}>
          PALPITE DO SONAR
        </Text>

        <NumberContainer>
          {currentGuess}
        </NumberContainer>
      </View>

      <View style={styles.buttonsContainer}>
        <PrimaryButton
          style={styles.button}
          onPress={nextGuessHandler.bind(null, 'lower')}
        >
          <Ionicons
            name="arrow-back"
            size={18}
            color={Colors.greenNeon}
          />
          {' MENOR'}
        </PrimaryButton>

        <PrimaryButton
          style={styles.button}
          onPress={nextGuessHandler.bind(null, 'greater')}
        >
          {'MAIOR '}
          <Ionicons
            name="arrow-forward"
            size={18}
            color={Colors.greenNeon}
          />
        </PrimaryButton>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>
          HISTÓRICO DE VARREDURAS
        </Text>

        <FlatList
          data={guessRounds}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item, index }) => (
            <GuessLogItem
              guess={item}
              round={guessRounds.length - index}
            />
          )}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  guessCard: {
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },

  guessLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },

  button: {
    flex: 1,
  },

  listContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },

  listTitle: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});