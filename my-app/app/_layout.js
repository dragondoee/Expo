import { Stack } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";

const backgroundImage = require("../assets/images/bg.webp");

export default function RootLayout() {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.image}
    >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});


