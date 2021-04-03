import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebaseX);

export const notifySellerOnNewOrder = functions.firestore
  .document("orders/{id}")
  .onCreate((snap, context) => {
    const order = snap.data();
    const storeAdmin = order.storeadmin;
    const orderid = order.id;
    // const orderid = order.customerid;
    console.log(storeAdmin);
    const db = admin.firestore();
    const deviceRef = db.collection("devices").doc(storeAdmin);
    deviceRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data) {
            const token = data.token;
            console.log(token);
            const payload = {
              notification: {
                title: "New Order",
                body: orderid,
                icon: "https://firebasestorage.googleapis.com/v0/b/my-town-market.appspot.com/o/favicon.png?alt=media&token=a50a979b-d9a7-47f8-aaaf-08805345d87c",
              },
            };
            const options = { priority: 'high'};
            return admin.messaging().sendToDevice(token, payload,options);
          }
        }
        return null
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  });
