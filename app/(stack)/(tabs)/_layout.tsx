import Ionicons from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "rgb(244, 63, 94)",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="barbell-sharp" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myPlan"
        options={{
          title: "My Plan",
          tabBarIcon: ({ color }) => (
            <Ionicons size={20} name="calendar-sharp" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
