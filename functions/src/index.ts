import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebaseX);

export const notifySellerOnNewOrder = functions.firestore
  .document("orders/{id}")
  .onCreate((snap, context) => {
    const order = snap.data();
    const storeAdmin = order.storeadmin;
    const db = admin.firestore();
    const deviceRef = db.collection("devices").doc(storeAdmin);
    deviceRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data) {
            const token = data.token;
            const payload = {
              notification: {
                title: "New Order",
                body: "from abc location xyz",
                icon: "",
              },
            };
            return admin.messaging().sendToDevice(token, payload);
          }
        }
        return null
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  });
