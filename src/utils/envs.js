// NOTE: http urls don't work on android, so must use live host with https to test on android
import { Platform } from "react-native";
const placesUrl = "https://placesnearby-n2utcvrwnq-uc.a.run.app";
const geoUrl = "https://geocode-n2utcvrwnq-uc.a.run.app";
const payUrl = "https://pay-n2utcvrwnq-uc.a.run.app";
const localUrl = "http://localhost:5001/mealstogo-51d3e/us-central1";

// check environment
export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const geoHost = !isDevelopment || isAndroid ? geoUrl : localUrl;
export const placesHost = !isDevelopment || isAndroid ? placesUrl : localUrl;
export const payHost = !isDevelopment || isAndroid ? payUrl : localUrl;
export const isMock = false;
