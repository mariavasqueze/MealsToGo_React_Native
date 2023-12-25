import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Search } from "./components/search.component";
import { LocationContext } from "../../services/location/location.context";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";
import { MapCallout } from "./components/map-callout.component";
import { SafeArea } from "../../components/utility/safe-area.component";

const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const RestaurantMap = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { viewport, lat, lng } = location;
  const { restaurants = [] } = useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.01,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { restaurant })
                }
              >
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  if (!location) {
    return (
      <Map
        region={{
          latitude: 0,
          longitude: 0,
        }}
      />
    );
  }
  return <RestaurantMap navigation={navigation} />;
};
