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
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 5,
            minWidth: 250,
          }}>
            <Text style={{ marginBottom: 10 }}>Votre note ici...</Text>
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
                minHeight: 60,
                marginBottom: 10,
                textAlignVertical: 'top',
              }}
            />
            <TouchableOpacity onPress={() => setShowNote(false)}>
              <Text style={{ color: 'blue' }}>Fermer</Text>
            </TouchableOpacity>
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
