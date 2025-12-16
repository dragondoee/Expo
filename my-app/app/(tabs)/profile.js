import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import BgImage from '../../components/Theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useAuthStore from "../../store/authStore";
import { Button } from '@react-navigation/elements';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Profil() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  return (
    <BgImage source={require('../../assets/images/bg.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <View style={styles.loginContainer}>

          <MaterialCommunityIcons style={styles.imageAccount} name="account-circle" size={60} />
          <Text style={styles.title}>Profil</Text>

          <Text style={styles.label}>Identité</Text>
          <Text>{user.first_name} {user.last_name}</Text>

          <Text style={styles.label}>Adresse email</Text>
          <Text>{user.email}</Text>

          <TouchableOpacity>
            <Link style={styles.button} href='editProfile'>Modifier le profil</Link>
          </TouchableOpacity>


        </View>

        <TouchableOpacity onPress={logout} style={styles.deconnect}> 
            <Text style={styles.deconnectText}>Se déconnecter </Text>
            <Ionicons name="log-out-outline" size={25} color="white"/>
        </TouchableOpacity>

      </View>
    </BgImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    width: 300,
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
  },
  imageAccount: {
    color: "#e75480",
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#e75480",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 5,
    marginTop: 32,
    margin: "auto",
    width: "100%",
    textAlign: "center",
    color: "#e75480", 
  },
  deconnect: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 6,
    color: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "rgba(0, 0, 0, 0.19)",
    borderRadius: 8,
  },
  deconnectText: { 
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

