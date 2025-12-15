import { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import useAuthStore from "../../store/authStore";
import api from "../../services/api";
import BgImage from '../../components/Theme';
import { Link, router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


// Formulaire modification profile
const EditProfileForm = () => {
  const user = useAuthStore(state => state.user);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);

  const { setUser, setToken, setIsLoggedIn } = useAuthStore();

  const handleEdit = async () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await api.put("/user/" + user._id, {
        email,
        first_name: firstName,
        last_name: lastName,
      });

      if (response.data.ok === false) {
        Alert.alert("Erreur", response.data.message || "Erreur lors de la modification du profil");
        return;
      }
      const userData = response;

      setUser(userData.data);
      setToken(userData.token);
      setIsLoggedIn(true);

      Alert.alert("Modification du profil", `Profil modifié avec succès !`);
      router.push("/profile");

    } catch (error) {
      console.log("Erreur update:", error.response?.code || error.message);

      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de la modification du profil"
      );
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete("/user/" + user._id);

      if (response.status !== 200) {
        Alert.alert('Erreur', 'Erreur lors de la suppression du compte');
        return;
      }

      Alert.alert('Succès', 'Compte supprimé avec succès');
      logout();

    } catch (error) {
      console.error("Erreur suppression:", error);
      Alert.alert("Erreur suppression:", error.message);
    }
  };

  return (
    <BgImage source={require('../../assets/images/bg.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={40}
      >
        <Link href="profile" style={{ ...styles.button, position: 'absolute', top: 40, left: 20, zIndex: 1 }}>
          Retour
        </Link>
        <View style={styles.container}>
          <View style={styles.signupContainer}>
            <MaterialCommunityIcons style={styles.imageAccount} name="account-edit" size={60} />
            <Text style={styles.title}>Modifier le profil</Text>

            <Text style={styles.label}>Prénom :</Text>
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={styles.label}>Nom :</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={lastName}
              onChangeText={setLastName}
            />

            <Text style={styles.label}>Email :</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>Modifier</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </BgImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
    imageAccount: {
    color: "#e75480",
    textAlign: "center",
  },
  signupContainer: {
    width: 320,
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: "#ffffffd2",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "bold",
  },
  link: {
    fontSize: 13,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: "#e75480",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 3,
    marginBottom: 20,
    borderWidth: 1.3,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fafafaff",
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#e75480",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 5,
    marginTop: 16,
    alignSelf: "flex-end", // remplace width: fit-content
  },
  buttonText: {
    color: "#e75480",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default EditProfileForm;
