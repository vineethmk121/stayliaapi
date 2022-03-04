import FCM from 'fcm-node';
const serverKey = 'AAAANUMQE8c:APA91bFBZXcoBtA5GMrpj3zxkP-UEtqY50RBW2Fa8XOAJJjeUOS4g1LWj2JuK5qiwy7Nkd81wstEl934KoUoZiLEOrGFv_dvtmvrOa-Um2Dd9OrNuJunFaoyuVoGkEd3g9efx8ytdCjt'; //LIVE ALI Key
const fcm = new FCM(serverKey);
// NOTIFICATION FUNCTION
const pushNotification = async (notificationTitle: String, notificationMsg: String, deviceToken: String, count = 0) => {
    var message = {
        to: deviceToken,
        collapse_key: 'AAAANUMQE8c:APA91bFBZXcoBtA5GMrpj3zxkP-UEtqY50RBW2Fa8XOAJJjeUOS4g1LWj2JuK5qiwy7Nkd81wstEl934KoUoZiLEOrGFv_dvtmvrOa-Um2Dd9OrNuJunFaoyuVoGkEd3g9efx8ytdCjt',
        notification: {
            title: notificationTitle,
            body: notificationMsg
        },
        data: {
            count: count
        }
    };
    fcm.send(message, function (err: Error, response: Response) {
        if (err) {
            console.log(err);
            console.log('Something has gone wrong!');
        } else {
            console.log('Successfully sent with response: ', response);
        }
    });
};
export default { pushNotification };
