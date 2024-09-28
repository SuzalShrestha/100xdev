import firebaseApp from "./firebase.services";

const messaging = firebaseApp.messaging();

// Define the structure for Android notification options
interface AndroidNotificationOptions {
  priority?: "normal" | "high";
}

// Define the structure for APNS notification options
interface APNSNotificationOptions {
  headers?: {
    "apns-priority"?: "10" | "5";
  };
}

// Define the structure for Webpush notification options
interface WebPushNotificationOptions {
  headers?: {
    Urgency?: "high" | "normal" | "low";
  };
}

// Define the structure for the notification object
interface NotificationMessage {
  token: string;
  notification?: {
    title?: string;
    body?: string;
  };
  data?: Record<string, string>;
  android?: AndroidNotificationOptions;
  apns?: APNSNotificationOptions;
  webpush?: WebPushNotificationOptions;
}

// Define the type for the sendNotification function
export const sendNotification = ({
  title,
  body,
  token,
  data,
  android,
  apns,
  webpush,
}: {
  title?: string;
  body?: string;
  token: string;
  data?: Record<string, unknown>; // Accepts any type as input for data
  android?: AndroidNotificationOptions;
  apns?: APNSNotificationOptions;
  webpush?: WebPushNotificationOptions;
}): Promise<string> => {
  // Convert data values to strings
  const sanitizedData: Record<string, string> = {};
  
  if (data) {
    Object.keys(data).forEach((key) => {
      sanitizedData[key] = String(data[key]); // Convert all values to string
    });
  }

  const message: NotificationMessage = {
    token,
    android: android || { priority: "high" },
    apns: apns || { headers: { "apns-priority": "5" } },
    webpush: webpush || { headers: { Urgency: "high" } },
    data: sanitizedData, // Use sanitized data with string values
  };

  if (title) message.notification = { title };
  if (body) {
    if (message.notification) {
      message.notification.body = body;
    } else {
      message.notification = { body };
    }
  }

  return messaging.send(message);
};
