import { Text, View, TouchableOpacity, TextInput } from "react-native";
import BgImage from '../../components/Theme';
import { Button } from "@react-navigation/elements";
import React from "react";


export default function Index() {
  const [showNote, setShowNote] = React.useState(false);

  const [note, setNote] = React.useState("");

  return (
    <BgImage source={require('../../assets/images/bg.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
      
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showNote && (
          <View style={{
            padding: 15,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 5,
            minWidth: 250,
            width: '100%',
            height: '100%',
          }}>
            <TouchableOpacity
              onPress={() => setShowNote(false)}
              style={{
                position: 'absolute',
                top: -22,
                right: -22,
                zIndex: 1,
                margin: 5,
                backgroundColor: 'white',
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#ccc',
                width: 35,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, color: 'red', padding: 5, fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Titre : </Text>
              <TextInput
                placeholder="Écrivez votre titre"
                style={{
                  borderColor: '#ccc',
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 7,
                  marginBottom: 10,
                }}
              />
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
                padding: 10,
                minHeight: 150,
                marginBottom: 10,
                textAlignVertical: 'top',
              }}
            />
            {/* <TouchableOpacity onPress={() => setShowNote(false)} style={{ backgroundColor: '#eee', padding: 10, borderRadius: 5, width: '100%', alignItems: 'center', marginTop: 5 }}>
              <Text style={{ color: 'green', textAlign: 'right' }}>Enregistrer</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </View>
      <View style={{
        position: 'absolute',
        bottom: 30,
        right: 30,
      }}>
        <Button
          onPress={() => setShowNote(true)}
          style={{
            borderRadius: 30,
            padding: 20,
            width: 50,
            height: 50,
            backgroundColor: '#2196F3',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 35 }}>+</Text>
        </Button>
      </View>
    </BgImage>
  );
}
