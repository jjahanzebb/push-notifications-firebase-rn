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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>FCM Test Application</Text>
      <Button
        title="ALERT LOCAL NOTIFY 2"
        onPress={() =>
          onDisplayNotification({
            title: "Notification Title",
            body: "Main body content of the notification",
          })
        }
      />

      <Button
        title="ALERT LOCAL NOTIFY 2"
        onPress={() =>
          onDisplayNotification({
            title: "Notification Title 2",
            body: "Main body content of the notification 2",
          })
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
