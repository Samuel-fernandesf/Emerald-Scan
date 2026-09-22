import { View, StyleSheet, Dimensions, Platform } from 'react-native';

import Colors from '../../constants/colors';

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 20,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        shadowOpacity: 0.3,
      },
    }),
  },
});