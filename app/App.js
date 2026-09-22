import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useAudioPlayer } from 'expo-audio';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Haptics from 'expo-haptics';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import Colors from './constants/colors';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

import BackgroundStars from './components/game/BackgroundStars';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);
  const [maxRange, setMaxRange] = useState(99);
  const [bestRounds, setBestRounds] = useState(null);

  const bgMusic = useAudioPlayer(
    require('./assets/sounds/bg-music.mp3')
  );

  const victorySound = useAudioPlayer(
    require('./assets/sounds/1-ton_fanfare.wav')
  );

  const [fontsLoaded] = useFonts({
    PixelFont: require('./assets/fonts/PixelifySans-VariableFont_wght.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  useEffect(() => {
    async function loadBestRounds() {
      const storedBestRounds = await AsyncStorage.getItem(
        'bestRounds'
      );

      if (storedBestRounds !== null) {
        setBestRounds(Number(storedBestRounds));
      }
    }

    loadBestRounds();
  }, []);

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }

    SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    if (gameIsOver) {
      bgMusic.pause();

      victorySound.seekTo(0);
      victorySound.volume = 1;
      victorySound.loop = false;
      victorySound.play();

      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    } else {
      victorySound.pause();

      bgMusic.volume = 0.4;
      bgMusic.loop = true;
      bgMusic.play();
    }
  }, [gameIsOver]);

  useEffect(() => {
    async function saveBestRounds() {
      if (!gameIsOver || guessRounds === 0) {
        return;
      }

      if (
        bestRounds === null ||
        guessRounds < bestRounds
      ) {
        setBestRounds(guessRounds);

        await AsyncStorage.setItem(
          'bestRounds',
          String(guessRounds)
        );
      }
    }

    saveBestRounds();
  }, [gameIsOver, guessRounds]);

  function startGameHandler(selectedNumber, selectedMaxRange) {
    setUserNumber(selectedNumber);
    setMaxRange(selectedMaxRange);
    setGameIsOver(false);
    setGuessRounds(0);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
    setGameIsOver(false);
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.greenNeon}
        />
      </View>
    );
  }

  let screen = (
    <StartGameScreen
      onStartGame={startGameHandler}
    />
  );

  if (userNumber && !gameIsOver) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        maxRange={maxRange}
        onGameOver={gameOverHandler}
      />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsCount={guessRounds}
        maxRange={maxRange}
        bestRounds={bestRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <LinearGradient
        colors={[
          Colors.spaceDark,
          Colors.spaceMedium,
          Colors.spaceLight,
        ]}
        style={styles.rootScreen}
      >
        <BackgroundStars />

        <SafeAreaView style={styles.safeArea}>
          {screen}
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.spaceDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
});