import messaging from "@react-native-firebase/messaging";

const getFCMToken = async () => {
    try {
        const token = await messaging().getToken();
        console.log("fcm token aayo", token);
        return token;
    } catch (error) {
        console.log('Error getting FCM token', error);
    }
};

export default getFCMToken;