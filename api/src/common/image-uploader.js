// @flow

import { loadEnvVars } from '../helpers';
import FirebaseApp from './firebase-app';

const fs = require('fs').promises;
const faker = require('faker');

loadEnvVars();

const ensureDir = async (dir: string) => {
  try {
    await fs.mkdir(dir);
  // eslint-disable-next-line no-empty
  } catch (err) {}
};

/**
 * Helper class to upload pictures
 * @class PictureUploader
 */

class PictureUploader {
  /**
   * Uploads image
   * @method PictureUploader#upload
   * @param {Buffer} data - image data buffer
   * @param {string} name - name of the image
   * @return {string} url of the uploaded image
   */
  static upload = async (data: Buffer, name: string) => {
    const bucket = FirebaseApp.getBucketService();

    if (!bucket) {
      return faker.image.imageUrl();
    }

    const dir = `${__dirname}/../../public/images`;
    await ensureDir(dir);
    const filePath = `${dir}/${name}`;
    await fs.writeFile(filePath, data, 'binary');

    const res = await bucket.upload(filePath, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    });

    await fs.unlink(filePath);

    return res[0].publicUrl();
  };
}

export default PictureUploader;
