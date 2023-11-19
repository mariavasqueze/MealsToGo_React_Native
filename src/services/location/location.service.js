import camelize from "camelize";
import { placesHost, isMock } from "../../utils/envs";

export const locationRequest = (searchTerm) => {
  return fetch(`${placesHost}/geocode?city=${searchTerm}&mock=${isMock}`).then(
    (res) => {
      return res.json();
    },
  );
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
