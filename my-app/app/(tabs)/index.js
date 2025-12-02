import { Text, View, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import BgImage from "../../components/Theme"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"

// Définition des styles (légèrement ajustés pour la simplification)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  mainContent: {
    marginHorizontal: 20,
    marginTop: 50,
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  notesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  noteWrapper: {
    width: "30%",
    marginBottom: 10,
    pointerEvents: "auto",
  },
  noteCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    minHeight: 130,
    marginBottom: 5,
  },
  noteTitleText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  // --- Bouton ajout (Positionné par rapport au container racine) ---
  addButtonContainer: {
    position: "absolute",
    bottom: 150,
    right: 20,
    zIndex: 999,
    elevation: 10,
    pointerEvents: "auto",
  },
  addButton: {
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  // --- Modale (Positionné par rapport au container racine) ---
  noteModalOverlay: {
    backgroundColor: "white",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  noteModalHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    backgroundColor: "#f0f0f0cd",
    height: 90,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  headerControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  noteInput: {
    flex: 1,
    padding: 20,
    textAlignVertical: "top",
    fontSize: 16,
  },
})

export default function Index() {
  const [showNote, setShowNote] = React.useState(false)
  const [note, setNote] = React.useState("")
  const [title, setTitle] = React.useState("")

  const openNote = () => {
    setNote("")
    setTitle("")
    setShowNote(true)
    console.log("add button pressed")
  }

  const closeNote = () => {
    setShowNote(false)
  }

  return (
    <BgImage source={require("../../assets/images/bg.png")} style={styles.container}>

      {/* 2. Contenu de la liste des notes */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContent}>
          <Text style={styles.headerText}>Mes Notes</Text>

          <View style={styles.notesGrid}>
            {[1, 2, 3, 4, 5, 6].map((item, idx) => (
              <TouchableOpacity key={idx} style={styles.noteWrapper}>
                <View style={styles.noteCard}>
                  <Text style={{ fontSize: 13 }}>Contenu de la note</Text>
                </View>
                <Text style={styles.noteTitleText}>Titre de la note</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>

      {/* 3. Bouton Flottant (position absolute par rapport au conteneur racine) */}
      <TouchableOpacity
        onPress={openNote}
        style={styles.addButtonContainer}
        activeOpacity={0.8}
      >
        <View style={styles.addButton}>
          <Ionicons name="add" size={30} color="white" />
        </View>
      </TouchableOpacity>

      {/* 4. Modale (Rendue en dernier avec zIndex très élevé) */}
      {showNote && (
        <SafeAreaView style={styles.noteModalOverlay}>
          <View style={styles.noteModalHeader}>
            <View style={styles.headerControls}>
              <TouchableOpacity onPress={closeNote}>
                <Ionicons name="arrow-back" size={24} color="#2196F3" />
              </TouchableOpacity>
              <TextInput placeholder="Écrivez votre titre" onChangeText={setTitle} value={title} style={styles.titleInput} />
            </View>
          </View>

          <TextInput value={note} onChangeText={setNote} placeholder="Écrivez votre note" multiline style={styles.noteInput} />
        </SafeAreaView>
      )}
    </BgImage>
  )
}