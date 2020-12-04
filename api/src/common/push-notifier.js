// @flow

import FirebaseApp from './firebase-app';

type Notification = {
  message: string,
  title: string,
  imageUrl?: string,
};

class PushNotifier {
  /**
   * Sends a push notification
   * @method PushNotifier#notify
   * @param {string} topic - notification's topic
   * @param {Notification} notification - notification's data
   * @return {Promise<?Object>} response
   */
  static notify = async (topic: string, payload: Notification) => {
    const messaging = FirebaseApp.getMessagingService();

    if (!messaging) {
      return null;
    }

    const notification: Object = {
      title: payload.title,
      body: payload.message,
    };

    if (payload.imageUrl) {
      notification.imageUrl = payload.imageUrl;
    }

    return messaging.send({
      topic,
      notification,
      data: {},
    });
  }
}

export default PushNotifier;
