import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import Colors from '../constants/colors';

import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import InstructionText from '../components/ui/InstructionText';
import Card from '../components/ui/Card';

function StartGameScreen({ onStartGame }) {
  const [difficulty, setDifficulty] = useState({
    label: 'Difícil',
    max: 99,
  });

  const [enteredValue, setEnteredValue] = useState('');

  function numberInputHandler(inputText) {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  }

  function resetInputHandler() {
    setEnteredValue('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredValue);

    if (
      isNaN(chosenNumber) ||
      chosenNumber <= 0 ||
      chosenNumber > difficulty.max
    ) {
      Alert.alert(
        'Anomalia Inválida!',
        `Por favor, informe um setor espacial válido entre 1 e ${difficulty.max}.`,
        [
          {
            text: 'Entendido',
            style: 'destructive',
            onPress: resetInputHandler,
          },
        ]
      );

      return;
    }

    onStartGame(chosenNumber, difficulty.max);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.screen}
      >
        <View style={styles.header}>
          <Title>DEFINA A ANOMALIA</Title>

          <Text style={styles.subtitle}>
            Um sinal desconhecido foi detectado no espaço profundo.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>
          NÍVEL DE VARREDURA
        </Text>

        <View style={styles.difficultyContainer}>
          {[
            { label: 'Fácil', max: 50 },
            { label: 'Difícil', max: 99 },
            { label: 'Insano', max: 200 },
          ].map((item) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.difficultyButton,
                difficulty.max === item.max &&
                styles.difficultyButtonActive,
                pressed && styles.difficultyButtonPressed,
              ]}
              onPress={setDifficulty.bind(null, item)}
              android_ripple={{
                color: Colors.emerald500,
              }}
            >
              <Text
                style={[
                  styles.difficultyText,
                  difficulty.max === item.max &&
                  styles.difficultyTextActive,
                ]}
              >
                {item.label} (1-{item.max})
              </Text>
            </Pressable>
          ))}
        </View>

        <Card>
          <InstructionText style={styles.instruction}>
            DIGITE O SETOR DA ANOMALIA
          </InstructionText>

          <TextInput
            style={styles.numberInput}
            maxLength={3}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={numberInputHandler}
            value={enteredValue}
            placeholder="00"
            placeholderTextColor={Colors.textMuted}
          />

          <View style={styles.buttonsContainer}>
            <PrimaryButton
              style={styles.button}
              onPress={resetInputHandler}
            >
              LIMPAR
            </PrimaryButton>

            <PrimaryButton
              style={styles.button}
              onPress={confirmInputHandler}
            >
              INICIAR MISSÃO
            </PrimaryButton>
          </View>
        </Card>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
  },

  sectionLabel: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 1,
  },

  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },

  difficultyButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.spaceLight,
    alignItems: 'center',
    overflow: 'hidden',
  },

  difficultyButtonActive: {
    backgroundColor: Colors.emerald600,
    borderColor: Colors.greenNeon,
  },

  difficultyButtonPressed: {
    opacity: 0.75,
  },

  difficultyText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: 'bold',
  },

  difficultyTextActive: {
    color: Colors.spaceDark,
  },

  instruction: {
    color: Colors.textLight,
    fontSize: 13,
    fontWeight: '600',
  },

  numberInput: {
    height: 55,
    width: 90,
    fontSize: 32,
    borderBottomWidth: 2,
    borderBottomColor: Colors.greenNeon,
    color: Colors.greenNeon,
    marginVertical: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  button: {
    flex: 1,
  },
});