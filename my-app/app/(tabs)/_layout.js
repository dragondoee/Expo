import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Tabs } from 'expo-router';
//import Header from '../../components/Header';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown: false,
        tabBarStyle: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 105, zIndex: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingBottom: 30 },
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 25, color: 'black' },
        tabBarItemStyle: { marginTop: 5 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'To-do List',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="editProfile"
        options={{
          href:null,
        }}
      />
    </Tabs>
  );
}
