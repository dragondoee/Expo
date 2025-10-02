import { Text, View, TouchableOpacity, TextInput } from "react-native";
import BgImage from '../../components/Theme';
import { Button } from "@react-navigation/elements";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";



export default function Index() {
  const [showNote, setShowNote] = React.useState(false);

  const [note, setNote] = React.useState("");

  return (
    <BgImage source={require('../../assets/images/bg.png')} style={{ flex: 1, width: '100%', height: '100%' }}>


      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, margin: 20, height: '100%', marginTop: 50 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'white' }}>Mes Notes</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' }}>
          {[1,2,3,4,5,6].map((item, idx) => (
            <View
              key={idx}
              style={{
                width: '30%',
              }}>
              <View style={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
                
                minHeight: 130,
              }}>
              <Text style={{ fontSize: 13 }}>Contenu de la note</Text>
              </View>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Titre de la note</Text>
            </View>
          ))}
        </View>
      </View>

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
                placeholder="Écrivez votre titre"
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Écrivez votre note"
            multiline
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 5,
              padding: 20,
              height: '100%',
              textAlignVertical: 'top',
            }}
          />
        </View>
      )}
      <View style={{
        position: 'absolute',
        bottom: 30,
        right: 30,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}>
        <TouchableOpacity
          onPress={() => setShowNote(true)}
          style={{
            borderRadius: 50,
            padding: 20,
            width: 70,
            height: 70,
            backgroundColor: '#2196F3',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 100,
            }}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </BgImage>
  );
}
