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
            <Ionicons size={20} name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myPlan"
        options={{
          title: "My Workouts",
          tabBarIcon: ({ color }) => (
            <Ionicons size={20} name="calendar-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "Exercises",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="barbell-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
