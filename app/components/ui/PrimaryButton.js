import { View, Text, Pressable, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

function PrimaryButton({ children, onPress, style }) {
  return (
    <View style={[styles.buttonOuterContainer, style]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.emerald500 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },

  buttonInnerContainer: {
    backgroundColor: Colors.emerald600,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },

  buttonText: {
    color: Colors.textLight,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
  },

  pressed: {
    opacity: 0.75,
  },
});