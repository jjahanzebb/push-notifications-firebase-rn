import messaging from "@react-native-firebase/messaging";
// import notifee from "@notifee/react-native";

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
};

export const notificationListener = async () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });
};

export const getToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();

  console.log("Token =>", token);
};

// export const onDisplayNotification = async (title, body) => {
//   // Request permissions (required for iOS)
//   await notifee.requestPermission();

//   // Create a channel (required for Android)
//   const channelId = await notifee.createChannel({
//     id: "default",
//     name: "Default Channel",
//   });

//   // Display a notification
//   await notifee.displayNotification({
//     title,
//     body,
//     android: {
//       channelId,
//       smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
//       // pressAction is needed if you want the notification to open the app when pressed
//       pressAction: {
//         id: "default",
//       },
//     },
//   });
// };
