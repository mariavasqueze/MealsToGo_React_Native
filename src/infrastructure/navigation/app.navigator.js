import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { MapScreen } from "../../features/map/map.screen";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { CartContextProvider } from "../../services/cart/cart.context";

import { colors } from "../../infrastructure/theme/colors";

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

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <CartContextProvider>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                display: "flex",
              },
              headerShown: false,
            }}
            tabBarOptions={{
              activeTintColor: colors.brand.primary,
              inactiveTintColor: colors.brand.muted,
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
              component={SettingsNavigator}
              options={createScreenOptions}
            />
          </Tab.Navigator>
        </CartContextProvider>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
