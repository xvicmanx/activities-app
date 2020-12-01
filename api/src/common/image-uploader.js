// @flow

const fs = require('fs').promises;

const ensureDir = async (dir: string) => {
  try {
    await fs.mkdir(dir);
  // eslint-disable-next-line no-empty
  } catch (err) {}
};

const {
  NODE_ENV,
  PORT,
} = process.env;

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
    const dir = `${__dirname}/../../public/images`;
    await ensureDir(dir);
    await fs.writeFile(`${dir}/${name}`, data, 'binary');
    const port = NODE_ENV === 'TEST' ? 4600 : PORT;
    return `http://localhost:${port || 4500}/images/${name}`;
  };
}

export default PictureUploader;
