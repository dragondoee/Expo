import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
      <Stack.Screen name="(app)" options={{headerShown:false}} />
      <Stack.Screen name="login" options={{title:"Se connecter", headerShown:false}} />
      <Stack.Screen name="signup" options={{title:'inscrire', headerShown:false}} />
    </Stack>;
}
