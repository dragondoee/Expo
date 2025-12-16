import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import useAuthStore from "../store/authStore";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </KeyboardProvider>
  );
}

function AppNavigator() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen
          name="signup"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  );
}

