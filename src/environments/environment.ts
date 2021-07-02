// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import firebase from "firebase";

export const environment = {
  production: true,
  firebase:{
    apiKey: "AIzaSyCcIY0aTcGCgo637lu3LeownlvXkWBOQ74",
    authDomain: "proj-alco.firebaseapp.com",
    databaseURL: "https://proj-alco-default-rtdb.firebaseio.com",
    projectId: "proj-alco",
    storageBucket: "proj-alco.appspot.com",
    messagingSenderId: "1033738505540",
    appId: "1:1033738505540:web:d713717bbdd5eb8d1f5b11",
    measurementId: "G-336K549BJR"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
