// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD2xKuED1P0HPiOd_bCDzRbJ0JDaR0hf-4",
    authDomain: "my-town-market.firebaseapp.com",
    projectId: "my-town-market",
    storageBucket: "my-town-market.appspot.com",
    messagingSenderId: "497015051371",
    appId: "1:497015051371:web:b16942fda7b16c6c9c8d2e",
    measurementId: "G-9CE3PSM3B5"
  },
  mapbox: {
    accessToken:
      'pk.eyJ1IjoibmV4dGdlbmFwcHMxNDYiLCJhIjoiY2ttOThxb241MDhpNDJ2cWwyNmY5emdmMiJ9.H_zdfR-03qKtQhignrDSng',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
