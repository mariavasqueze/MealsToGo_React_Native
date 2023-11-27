import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { MapScreen } from "../../features/map/map.screen";
import { CheckoutNavigator } from "./checkout.navigator";
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

      switch (route.name) {
        case "Restaurants":
          iconName = focused ? "restaurant" : "restaurant-outline";
          break;
        case "Settings":
          iconName = focused ? "md-settings" : "md-settings-outline";
          break;
        case "Checkout":
          iconName = "md-cart";
          break;
        default:
          iconName = focused ? "map" : "map-outline";
          break;
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  };
};
// primary: "#696AC3",
// secondary: "#5D6CC6",
export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <CartContextProvider>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: colors.brand.primary,
              tabBarInactiveTintColor: colors.brand.muted,
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
              name="Checkout"
              component={CheckoutNavigator}
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
