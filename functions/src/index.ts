import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebaseX);

exports.newOrderNotification = functions.firestore
  .document("orders/{id}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const payload = {
      notification: {
        title: "Testing",
        body: "Testing this body",
        icon: "",
      },
    };

    const tokens: string | string[] = [];

    const db = admin.firestore();
    const device = await db.collection('devices').doc(data.storeadminid).get();
           let result=device.data();
           let token=result['token']
           tokens.push(token)
        //      device.forEach(result => {
        //      token = result.data().token;
        //      tokens.push(token);
        // })
   

    return admin.messaging().sendToDevice(tokens, payload);
  });
