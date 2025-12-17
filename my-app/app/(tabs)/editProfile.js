import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import useAuthStore from "../../store/authStore";
import api from "../../services/api";
import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from '../../components/Container';

// Formulaire modification profile
const EditProfileForm = () => {
  const user = useAuthStore(state => state.user);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const logout = useAuthStore(state => state.logout);


  const { setUser } = useAuthStore();

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

      if (response.ok === false) {
        console.log("Erreur :", response);
        Alert.alert("Erreur modification", response.error || "Erreur lors de la modification du profil");
        return;
      }
      const userData = response;

      setUser(userData.data);

      Alert.alert("Modification du profil", `Profil modifié avec succès !`);
      router.push("/profile");

    } catch (error) {
      console.log("Erreur update:", error.message);

      Alert.alert(
        "Erreur",
        "Erreur lors de la modification du profil"
      );
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Supprimer le profil",
      "Êtes-vous sûr de vouloir supprimer votre profil ?",
      [
        {
          text: "Annuler",
        },
        {
          text: "Supprimer",
          onPress: async () => {
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
          }
        }
      ]
    );
  };

  return (
    
    <ScreenContainer backlink={"profile"} style={{marginTop: "-20%"}}>
        {/* <Link href="profile" style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={16} color="white" />
            Retour
        </Link> */}
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

            <TouchableOpacity style={styles.buttonUpdate} onPress={handleEdit}>
              <Text style={styles.buttonText}>Modifier</Text>
              <Ionicons name="pencil-outline" size={20} color="#e75480" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
              
              <Text style={{color: "red"}}>Supprimer</Text>
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  imageAccount: {
    color: "#e75480",
    textAlign: "center",
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
  buttonUpdate: {
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#e75480",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 5,
    marginTop: 16,
    alignItems: "center", 
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  buttonDelete: {
    color: "red",
    marginTop: 22,
    alignItems: "center", 
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  buttonText: {
    color: "#e75480",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default EditProfileForm;
