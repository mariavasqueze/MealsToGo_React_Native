import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { RestaurantInfoCard } from "../components/restaurant-info-card-component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { Search } from "../components/search.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { Text } from "../../../components/typography/text.component";
import {
  Loading,
  LoadingContainer,
  RestaurantList,
} from "../components/restaurant-list.styles";

export const RestaurantsScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);
  const { isLoading, restaurants, error } = useContext(RestaurantsContext);
  const { error: locationError } = useContext(LocationContext);
  const [isToggled, setIsToggled] = useState(false);

  const hasError = !!error || !!locationError;

  return (
    <SafeArea>
      {isLoading ? (
        <LoadingContainer>
          <Loading animating={true} color="#2182BD" size={50} />
        </LoadingContainer>
      ) : (
        <>
          <Search
            isFavouritesToggled={isToggled}
            onFavouritesToggle={() => setIsToggled(!isToggled)}
          />
          {isToggled && (
            <FavouritesBar
              favourites={favourites}
              onNavigate={navigation.navigate}
            />
          )}
          {hasError ? (
            <Spacer position="left" size="large">
              <Text variant="error">
                Something went wrong retrieving the data
              </Text>
            </Spacer>
          ) : (
            <RestaurantList
              data={restaurants}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("RestaurantDetail", {
                      restaurant: item,
                    })
                  }
                >
                  <Spacer position="bottom" size="large">
                    <FadeInView>
                      <RestaurantInfoCard restaurant={item} />
                    </FadeInView>
                  </Spacer>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
            />
          )}
        </>
      )}
    </SafeArea>
  );
};
