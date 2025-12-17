import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from "react-native"
import BgImage from "../../components/Theme"
import React, { useEffect, useState, useCallback } from "react"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import api from "../../services/api" 
import { useIsFocused } from "@react-navigation/native"
import useAuthStore from "../../store/authStore" 


const Index = () => {
  const [showNote, setShowNote] = useState(false)
  const [noteContent, setNoteContent] = useState("")
  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState([])
  const [updateNoteId, setUpdateNoteId] = useState(null)

  const [selectedIds, setSelectedIds] = useState([]); 
  const isSelectionMode = selectedIds.length > 0;

  const user = useAuthStore((state) => state.user)
  const isFocused = useIsFocused();

  // chargement des notes
  const fetchNotes = useCallback(async () => {
    if (!user || !user._id) return;
    try {
      const res = await api.get(`/note/user/all`);
      if (res.ok) {
        setNotes(res.notes);
      }
    } catch (e) {
      console.log("Erreur chargement notes", e);
    }
  }, [user]);

  useEffect(() => {
    if(isFocused && user) {
      fetchNotes();
      setSelectedIds([]); 
    }
  }, [fetchNotes, isFocused, user]);

  const openNote = () => {
    setNoteContent("")
    setTitle("")
    setShowNote(true)
  }

  const closeNote = () => setShowNote(false)

  // logique de sélection notes
  const handleLongPress = (noteId) => {
    // active le mode sélection et ajoute l'élément
    if (!selectedIds.includes(noteId)) {
        setSelectedIds([...selectedIds, noteId]);
    }
  };

  const handleNotePress = (note) => {
    if (isSelectionMode) {
        // mode sélection : on coche/décoche
        if (selectedIds.includes(note._id)) {
            setSelectedIds(prev => prev.filter(id => id !== note._id));
        } else {
            setSelectedIds(prev => [...prev, note._id]);
        }
    } else {
        updateNote(note);
    }
  };

  const cancelSelection = () => {
      setSelectedIds([]);
  };

  // logique de suppression groupée
  const deleteSelectedNotes = () => {
    Alert.alert(
        "Supprimer la sélection",
        `Voulez-vous supprimer ces ${selectedIds.length} notes ?`,
        [
            { text: "Annuler", style: "cancel" },
            { 
                text: "Supprimer", 
                style: "destructive", 
                onPress: async () => {
                    try {
                        // supprime toutes les notes cochées
                        await Promise.all(selectedIds.map(id => api.delete(`/note/${id}`)));
                        
                        // recharge la liste et on quitte le mode sélection
                        await fetchNotes();
                        setSelectedIds([]);
                    } catch (e) {
                        console.error(e);
                        Alert.alert("Erreur", "Impossible de supprimer certaines notes");
                    }
                }
            }
        ]
    );
  };

  const updateNote = async (note) => {
    setNoteContent(note.content)
    if (note.title === "Sans titre") {
        setTitle("") 
    } else {
        setTitle(note.title)
    }
    setUpdateNoteId(note._id)
    setShowNote(true)
  }

  // sauvegarde (création ou mise à jour) note
  const handleSave = async () => {
    if (!title && !noteContent) return closeNote()
    if (!user || !user._id) {
      alert("Vous devez être connecté pour sauvegarder une note")
      return
    }

    try {
      if (updateNoteId) {
        // modifier une note existante
        const res = await api.put(`/note/user/${updateNoteId}`, { 
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
        // création d'une nouvelle note
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
      console.error("Erreur mise à jour :", e);
      alert("Erreur mise à jour :", e.message);
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
              const res = await api.delete(`/note/user/${updateNoteId}`);
              
              if (res.ok) {
                await fetchNotes();
                closeNote();
                clearNote();
              } else {
                alert("Erreur lors de la suppression");
              }
            } catch (e) {
              console.error("Erreur mise à jour :", e);
              alert("Erreur mise à jour :", e.message);
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
          
          {/* header dynamique (normal vs sélection) */}
          {isSelectionMode ? (
            <View style={styles.selectionHeaderContainer}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity onPress={cancelSelection} style={{marginRight: 10}}>
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.selectionHeaderText}>{selectedIds.length} sélectionné(s)</Text>
                </View>
                <TouchableOpacity onPress={deleteSelectedNotes} style={{backgroundColor: "rgba(255, 255, 255, 0.66)", padding: 6, borderRadius: 6}}>
                    <Ionicons name="trash" size={28} color="#ff4444" />
                </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.headerText}>Mes Notes</Text>
          )}

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.notesGrid}>
              
              {notes.length === 0 && (
              <Text style={{ color: 'white', opacity: 0.9, fontSize: 16, marginTop: 20 }}>
                Aucune note pour le moment
              </Text>
              )}

              {notes.map((item) => {
                  const isSelected = selectedIds.includes(item._id); // vérifie si la note est cochée

                  return (
                      <TouchableOpacity 
                        key={item._id} 
                        style={styles.noteWrapper}
                        onLongPress={() => handleLongPress(item._id)} 
                        onPress={() => handleNotePress(item)}         
                        activeOpacity={0.7}
                      >
                        <View style={[
                            styles.noteCard, 
                            isSelected && styles.noteCardSelected 
                        ]}>
                          <Text numberOfLines={6} style={styles.noteContentPreview}>
                            {item.content}
                          </Text>

                            {/* icône checkmark si sélectionné */}
                          {isSelected && (
                              <View style={styles.checkIcon}>
                                  <Ionicons name="checkmark-circle" size={24} color="#e75480" />
                              </View>
                          )}
                        </View>
                        
                        <Text numberOfLines={1} style={styles.noteTitleText}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                  );
              })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* cache le bouton crayon si on est en train de sélectionner des notes */}
      {!isSelectionMode && (
          <TouchableOpacity onPress={openNote} style={styles.addButtonContainer} activeOpacity={0.8}>
            <View style={styles.addButton}>
              <Ionicons name="pencil" size={28} color="white" />
            </View>
          </TouchableOpacity>
      )}

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
          <Ionicons name="arrow-back" size={24} color="#e75480"/>
          </TouchableOpacity>
          <TextInput 
          placeholder="Titre..." 
          onChangeText={setTitle} 
          value={title} 
          style={styles.titleInput} 
          />
          {/* bouton sauvegarder */}
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

export default Index;


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
    marginBottom: 5,
    borderWidth: 2,   // ajouté pour gérer la bordure de sélection
    borderColor: 'white'
  },
  noteCardSelected: {
    borderColor: '#e75480', 
    backgroundColor: '#ffe4ec', 
  },
  noteTitleText: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "white" },
  noteContentPreview: { 
    fontSize: 12, 
    color: "#333" },
  
  selectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.23)', 
    padding: 10,
    borderRadius: 8
  },
  selectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  selectionActions: {
    flexDirection: 'row',
    gap: 15
  },
  checkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1
  },
  
  addButtonContainer: { 
    position: "absolute", 
    bottom: 145, 
    right: 30,
    zIndex: 5,
    elevation: 20
  },
  addButton: { 
    borderRadius: 50, 
    width: 68, 
    height: 68, 
    backgroundColor: "#381f1f48", 
    borderColor: "white",
    borderWidth: 2,
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
    marginRight: 15,
    backgroundColor: "#e75480", 
    borderRadius: 20 
  }
})