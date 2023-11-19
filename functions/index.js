/* eslint-disable prettier/prettier */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const {geocodeRequest} = require("./geocode");
const {placesRequest} = require("./places");
const {Client} = require("@googlemaps/google-maps-services-js");

const client = new Client({});

exports.geocode = onRequest((request, response) => {
  geocodeRequest(request, response, client);
});

exports.placesNearBy = onRequest((request, response) => {
  placesRequest(request, response, client);
});

// run npm run deploy to deploy functions to firebase
// then replace urls in calls to the live server urls from firebase

// set api keys --> run in console
// --> firebase functions:config:set google.key="your api key"
