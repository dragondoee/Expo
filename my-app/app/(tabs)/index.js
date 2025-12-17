import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from "react-native"
import BgImage from "../../components/Theme"
import React, { useEffect, useState, useCallback } from "react"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import api from "../../services/api" 
import { useIsFocused } from "@react-navigation/native"
import useAuthStore from "../../store/authStore" 

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { 
    flex: 1,
    width: "100%",
   },
  mainContent: { 
    marginTop: 50, 
    flex: 1,
    paddingHorizontal: 30
  },
  headerText: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 40, 
    color: "white" 
  }, 
  notesGrid: { 
    display: "flex",
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", 
    marginBottom: "30%"
  },  
  noteWrapper: { 
    width: "45%", 
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
    zIndex: 5,
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
    left: 0, 
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
  const [updateNoteId, setUpdateNoteId] = useState(null)

  
  // on récupère l'utilisateur connecté depuis le store global
  const user = useAuthStore((state) => state.user)
  const isFocused = useIsFocused();

  const fetchNotes = useCallback(async () => {
    // si pas d'utilisateur, on ne fait rien
    if (!user || !user._id) return;

    try {
      const res = await api.get(`/note/user/${user._id}`);
      if (res.ok) {
        setNotes(res.notes);
      }
    } catch (e) {
      console.log("Erreur chargement notes", e);
    }
  }, [user]);

  useEffect(() => {
    // On ne charge les notes que si l'écran est actif ET qu'on a un utilisateur connecté
    if(isFocused && user) {
      fetchNotes();
    }
  }, [fetchNotes, isFocused, user]);

  const openNote = () => {
    setNoteContent("")
    setTitle("")
    setShowNote(true)
  }

  const closeNote = () => setShowNote(false)

  // mise à jour d'une note existante
  const updateNote = async (note) => {
    setNoteContent(note.content)
    setTitle(note.title)
    setUpdateNoteId(note._id)
    setShowNote(true)
  }

  const clearNote = () => {
    setNoteContent("")
    setTitle("")
    setUpdateNoteId(null)
  }

  // sauvegarde (création ou mise à jour)
  const handleSave = async () => {
    if (!title && !noteContent) return closeNote()
    if (!user || !user._id) {
      alert("Vous devez être connecté pour sauvegarder une note")
      return
    }

    try {
      if (updateNoteId) {
        // Mise à jour d'une note existante
        const res = await api.put(`/note/${updateNoteId}`, { 
          title: title || "Sans titre", 
          content: noteContent
        })
        
        if (res.ok) {
          await fetchNotes()
          closeNote()
          setUpdateNoteId(null)
        } else {
          alert("Erreur lors de la mise à jour")
        }
      } else {
        // Création d'une nouvelle note
        const res = await api.post('/note/create', { 
          title: title || "Sans titre", 
          content: noteContent,
          user_id: user._id 
        })

        if (res.ok) {
          await fetchNotes()
          closeNote()
        } else {
          alert("Erreur lors de la sauvegarde")
        }
      }
    } catch (e) {
      console.error(e)
      alert("Erreur réseau")
    }
  }

  // suppression d'une note
  const handleDelete = () => {
    if (!updateNoteId) return;

    Alert.alert(
      "Supprimer la note",
      "Êtes-vous sûr de vouloir supprimer cette note ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await api.delete(`/note/${updateNoteId}`);
              
              if (res.ok) {
                await fetchNotes();
                closeNote();
                clearNote();
              } else {
                alert("Erreur lors de la suppression");
              }
            } catch (e) {
              console.error(e);
              alert("Erreur réseau");
            }
          }
        }
      ]
    );
  };

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
                  <TouchableOpacity style={styles.noteCard} onPress={() => updateNote(item)}>
                    <Text numberOfLines={6} style={styles.noteContentPreview}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
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
              {/* Bouton Supprimer */}
              {updateNoteId && (
                <TouchableOpacity onPress={handleDelete} style={styles.saveButton}>
                  <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
              )}
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
