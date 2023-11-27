import camelize from "camelize";
import { placesHost, isMock } from "../../utils/envs";

export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  return fetch(
    `${placesHost}/placesNearby?location=${location}&mock=${isMock}`,
  ).then((res) => {
    return res.json();
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
      address: restaurant.vicinity,
    };
  });

  return camelize(mappedResults);
};
