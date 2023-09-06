// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  CONSTANTS: {
    API_URL: {
      ACCOUNT: 'https://pompadour-svc-accounts-stg.azurewebsites.net/api/v1/',
      GENERAL: 'https://pompadour-svc-general-stg.azurewebsites.net/api/v1/',
      PRODUCT_AND_SERVICES: 'https://pompadour-svc-products-and-services-stg.azurewebsites.net/api/v1/',
      OTHERS: 'https://pompadour-svc-others-stg.azurewebsites.net/api/v1/',
      BOOKINGS: 'https://pompadour-svc-bookings-stg.azurewebsites.net/api/v1/'
      // ACCOUNT: 'https://pompadour-svc-accounts.azurewebsites.net/api/v1/',
      // GENERAL: 'https://pompadour-svc-general.azurewebsites.net/api/v1/',
      // PRODUCT_AND_SERVICES: 'https://pompadour-svc-products-and-services.azurewebsites.net/api/v1/',
      // OTHERS: 'https://pompadour-svc-others.azurewebsites.net/api/v1/',
      // BOOKINGS: 'https://pompadour-svc-bookings.azurewebsites.net/api/v1/'
    },
    USER_ROLE: 3,
    GOOGLE_MAP_ID: 'AIzaSyDPXDnrc6vJFzMqTRKLhwM15f081Xyuclw'
  },
  STORAGE_KEYS: {
    USER_INFO_KEY: 'XXX_USER_INFO_XXX',
    BOOKING_STORAGE_KEY: 'XXX_BOOKING_STORAGE_KEY_XXX',
    ACCESS_TOKEN_KEY: 'XXX_ACCESS_TOKEN_XXX',
    REFRESH_TOKEN_KEY: 'XXX_REFRESH_TOKEN_XXX',
    RECENT_CONTACT: 'XXX_RECENT_CONTACT_XXX',
    NOTIFICATIONS_KEY: 'XXX_NOTIFICATIONS_KEY_XXX'
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
