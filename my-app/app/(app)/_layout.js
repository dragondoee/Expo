import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
      <Stack.Screen name="index" options={{title:"To-do List", headerShown:false}} />
      <Stack.Screen name="profil" options={{title:"Profil", headerShown:false}} />
    </Stack>;
}
