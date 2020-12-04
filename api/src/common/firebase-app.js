// @flow

import admin from 'firebase-admin';
import fs from 'fs';

import { loadEnvVars } from '../helpers';

loadEnvVars();

const {
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_KEYS_FILE,
  NODE_ENV,
} = process.env;

const isTest = () => NODE_ENV === 'TEST';

class FirebaseApp {
  static initialized = false;

  /**
   * Sends a push notification
   * @method FirebaseApp#init
   */
  static init = () => {
    if (!isTest() && !FirebaseApp.initialized) {
      if (FIREBASE_DATABASE_URL && FIREBASE_STORAGE_BUCKET) {
        const credsFilePath = FIREBASE_KEYS_FILE || `${__dirname}/../../data/key.json`;
        const content = fs.readFileSync(credsFilePath).toString();
        admin.initializeApp({
          credential: admin.credential.cert(JSON.parse(content)),
          databaseURL: FIREBASE_DATABASE_URL,
          storageBucket: FIREBASE_STORAGE_BUCKET,
        });

        FirebaseApp.initialized = true;
      } else {
        throw new Error('Error while initializing firebase. Please define FIREBASE_DATABASE_URL and FIREBASE_STORAGE_BUCKET env vars');
      }
    }
  }

  /**
   * Gets the messaging service
   * @method FirebaseApp#getMessagingService
   * @returns {?Object}
   */
  static getMessagingService = () => {
    if (!FirebaseApp.initialized) {
      return null;
    }

    return admin.messaging();
  }

  /**
   * Gets the bucket service
   * @method FirebaseApp#getBucketService
   * @returns {?Object}
   */
  static getBucketService = () => {
    if (!FirebaseApp.initialized) {
      return null;
    }

    return admin.storage().bucket();
  }
}

export default FirebaseApp;
