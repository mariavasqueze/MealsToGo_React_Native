import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Text } from "react-native";
import { RestaurantNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/map.screen";

function SettingsScreen() {
  return (
    <SafeArea>
      <Text>Settings!</Text>
    </SafeArea>
  );
}

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
  return {
    tabBarIcon: ({ focused, size, color }) => {
      let iconName;

      if (route.name === "Restaurants") {
        iconName = focused ? "restaurant" : "restaurant-outline";
      } else if (route.name === "Settings") {
        iconName = focused ? "md-settings" : "md-settings-outline";
      } else {
        iconName = focused ? "map" : "map-outline";
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  };
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            display: "flex",
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Restaurants"
          component={RestaurantNavigator}
          options={createScreenOptions}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={createScreenOptions}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={createScreenOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
