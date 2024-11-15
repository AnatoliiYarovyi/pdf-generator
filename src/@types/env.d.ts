/**
 * Here init .env variables for ts
 * Ex. :
 * PROD_PASSWORD: string
 *
 * That is made for ts recognized this values
 */
declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    API_KEY_TRY_CATCH_CLOUD: string;
  }
}
