import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import {
  getToken,
  notificationListener,
  onDisplayNotification,
  requestUserPermission,
} from "./utils";

export default function App({ navigation }) {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    getToken();
  }, []);

  const sendPushNotification = async (title, text) => {
    const apiKey =
      "AAAAVJ1MBSY:APA91bHWKwAIFNVVB7ECzftqyk-JYIh2TMmEn1-I1RJLIh0QYLu65oQQloOic6sBHGcWf-WVv7sLFKOXK41DIBGI1Sz5pRf6Sh9IiVzN_5W2ZZUYN0SI75GvcLl-Tvg8k8ome-r3ZG-M";
    const url = "https://fcm.googleapis.com/fcm/send";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `key=${apiKey}`,
    };

    const body = JSON.stringify({
      notification: {
        title,
        text,
      },
      data: {
        "<some_key>": "<some_value>",
      },
      to: "/topics/anytopic",
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });

      console.log("FCM API response:", response);
    } catch (error) {
      console.error("Error sending FCM push notification:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>FCM Test Application</Text>
      <Button
        title="SUBSCRIBE"
        onPress={async () => await messaging().subscribeToTopic("anytopic")}
      />

      <Button
        title="SEND NOTIFICATION"
        onPress={() =>
          sendPushNotification("Testing Title", "Testing notification text")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
