import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Tabs } from 'expo-router';
import Header from '../../components/Header';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', header:({options}) => <Header/> }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'To-do List',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
