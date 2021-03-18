import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

@Injectable({
    providedIn: "root",
  })
export class FCMService {
    constructor(private firebaseX: FirebaseX, private afs: AngularFirestore) {}

    async getToken() {
        let token = await this.firebaseX.getToken();
        return this.saveTokenToFirestore(token);
    }

    saveTokenToFirestore(token) {
        if (!token) return;
        const devicesRef = this.afs.collection('devices');
        const docData = {
            token,
            userid: localStorage.getItem('uid')
        }
        return devicesRef.doc(localStorage.getItem('uid')).set(docData)
    }
}