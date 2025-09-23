import { Stack } from "expo-router";
import Header from '../components/Header';

export default function RootLayout() {
  return <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
      <Stack.Screen name="login" options={{title:"Se connecter", headerShown:true}} />
      <Stack.Screen name="signup" options={{title:'inscrire', headerShown:false}} />
    </Stack>;
}
