import { Stack } from "expo-router";
import { StatusBar } from "react-native";
/* import { SafeAreaView } from "react-native-safe-area-context"; */import useAuthStore from "../store/authStore";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <>
        <KeyboardProvider>
        <StatusBar style="auto" />

        <Stack>
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen
              name="login"
              options={{ title: "Se connecter", headerShown: false }}
            />
          </Stack.Protected>

          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen
              name="signup"
              options={{ title: "S'inscrire", headerShown: false }}
            />
          </Stack.Protected>

        </Stack>
      </KeyboardProvider>
    </>
  );
}
