import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native"
import BgImage from "../../components/Theme"
import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import api from "../../services/api" 
import { useIsFocused } from "@react-navigation/native" 

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  mainContent: { 
    marginHorizontal: 20, 
    marginTop: 50, 
    flex: 1 
  },
  headerText: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "white" 
  },
  notesGrid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 12, 
    justifyContent: "space-between" 
  },  
  noteWrapper: { 
    width: "30%", 
    marginBottom: 10 
  },
  noteCard: { 
    backgroundColor: "white", 
    borderRadius: 10, 
    padding: 10, 
    minHeight: 130, 
    marginBottom: 5 
  },
  noteTitleText: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "white" },
  noteContentPreview: { 
    fontSize: 12, 
    color: "#333" },
  
  addButtonContainer: { 
    position: "absolute", 
    bottom: 150, 
    right: 20,
    zIndex: 20,
    elevation: 20
  },
  addButton: { 
    borderRadius: 50, 
    width: 60, 
    height: 60, 
    backgroundColor: "#2196F3", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  
  noteModalOverlay: { 
    backgroundColor: "white", 
    position: "absolute", 
    width: "100%", 
    height: "100%", 
    top: 0, 
    left: 0 
  },
  noteModalHeader: { 
    flexDirection: "row", 
    alignItems: "flex-end", 
    width: "100%", 
    backgroundColor: "#f0f0f0cd", 
    height: 90, 
    paddingBottom: 10, 
    paddingHorizontal: 15 
  },
  headerControls: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 10, 
    flex: 1 
  },
  titleInput: { 
    fontSize: 18, 
    fontWeight: "bold", 
    flex: 1 
  },
  noteInput: { 
    flex: 1, 
    padding: 20, 
    textAlignVertical: "top", 
    fontSize: 16 
  },
  saveButton: { 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    backgroundColor: "#2196F3", 
    borderRadius: 20 
  }
})

export default function Index() {
  const [showNote, setShowNote] = useState(false)
  const [noteContent, setNoteContent] = useState("")
  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState([])
  const [userId, setUserId] = useState("default_user")
  const isFocused = useIsFocused();

  // Charger les notes au démarrage et à chaque fois que l'écran devient actif
  useEffect(() => {
    if(isFocused) {
      fetchNotes();
    }
  }, [isFocused]);

  const fetchNotes = async () => {
    try {
      const res = await api.get(`note/user/${userId}`);

      if (res.ok) {
        setNotes(res.notes);
      }
    } catch (e) {
      console.log("Erreur chargement notes", e);
    }
  }

  const openNote = () => {
    setNoteContent("")
    setTitle("")
    setShowNote(true)
  }

  const closeNote = () => {
    setShowNote(false)
  }

  const handleSave = async () => {
    if (!title && !noteContent) return closeNote(); // Ne pas sauvegarder si vide

    try {
      // Envoi des données au backend
      const res = await api.post('/note/create', { 
      title: title || "Sans titre", 
      content: noteContent,
      user_id: userId
    });

      if (res.ok) {
        await fetchNotes();
        closeNote();
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    } catch (e) {
      console.error(e);
      alert("Erreur réseau");
    }
  }

  return (
    <BgImage source={require("../../assets/images/bg.png")} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContent}>
          <Text style={styles.headerText}>Mes Notes</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.notesGrid}>
              {/* Affichage dynamique des notes */}
              {notes.length === 0 && (
                <Text style={{ color: 'white', opacity: 0.7 }}>
                  Aucune note pour le moment
                </Text>
              )}

              {notes.map((item) => (
                <TouchableOpacity key={item._id} style={styles.noteWrapper}>
                  <View style={styles.noteCard}>
                    <Text numberOfLines={6} style={styles.noteContentPreview}>
                      {item.text}
                    </Text>
                  </View>
                  <Text numberOfLines={1} style={styles.noteTitleText}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <TouchableOpacity onPress={openNote} style={styles.addButtonContainer} activeOpacity={0.8}>
        <View style={styles.addButton}>
          <Ionicons name="add" size={30} color="white" />
        </View>
      </TouchableOpacity>

      {showNote && (
        <View style={{
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 5,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
        }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', width: '100%', backgroundColor: '#f0f0f0cd', height: 90, paddingBottom: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15, gap: 10 }}>
              <TouchableOpacity onPress={() => setShowNote(false)} >
                <Ionicons name="arrow-back" size={24} color="#2196F3"/>
              </TouchableOpacity>
              <TextInput 
                placeholder="Titre..." 
                onChangeText={setTitle} 
                value={title} 
                style={styles.titleInput} 
              />
              {/* Bouton Sauvegarder */}
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TextInput 
            value={noteContent} 
            onChangeText={setNoteContent} 
            placeholder="Écrivez votre note..." 
            multiline 
            style={styles.noteInput} 
          />
        </View>)}
    </BgImage>
  );
}
