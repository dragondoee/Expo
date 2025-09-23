import { Stack } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";

const backgroundImage = require("../assets/images/bg.png");

export default function RootLayout() {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.image}
    >
      <View style={{ flex: 1, backgroundColor: "red", borderBlockColor: "blue" }} >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          options={{ title: "Se connecter", headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          options={{ title: "S'inscrire", headerShown: false }}
        />
      </Stack>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
});


