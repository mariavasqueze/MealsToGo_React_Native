/* eslint-disable prettier/prettier */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {geocodeRequest} = require("./geocode");
const {placesRequest} = require("./places");
const {payRequest} = require("./pay");

const {Client} = require("@googlemaps/google-maps-services-js");
const stripeClient = require("stripe")(functions.config().stripe.key);
const googleClient = new Client({});

exports.geocode = onRequest((request, response) => {
  geocodeRequest(request, response, googleClient);
});

exports.placesNearby = onRequest((request, response) => {
  placesRequest(request, response, googleClient);
});

exports.pay = onRequest((request, response) => {
  payRequest(request, response, stripeClient);
});

// run npm run deploy to deploy functions to firebase
// then replace urls in calls to the live server urls from firebase

// set api keys --> run in console
// --> firebase functions:config:set google.key="your api key"
// then configure in runtime file:
// firebase functions:config:get > .runtimeconfig.json
