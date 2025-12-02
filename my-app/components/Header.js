import { View, Text, StyleSheet, Platform } from 'react-native';

export default function Header({ title = "Tutiger Do List" }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 44 + 20 : 56, // 20 pour la status bar iOS
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
    paddingHorizontal: 16,
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0.8,
    borderBottomColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4, // pour Android
  },
  title: {
    fontSize: 17,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
    color: '#000',
    textAlign: 'center',
  },
});
