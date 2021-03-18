import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  notificationRef: AngularFirestoreCollection;

  constructor(public Afs: AngularFirestore) {}

  public addNotification(record) {
    this.notificationRef = this.Afs.collection("notifications");
    this.notificationRef.add({ ...record }).then((snapshot) => {});
  }

  getNotificationsByUserId(id: string) {
    this.notificationRef = this.Afs.collection<Notification>(
      'notifications',
      (ref) => ref.where('to', '==', id)
    );
    return this.notificationRef.snapshotChanges().pipe(
      map((res) =>
        res.map((dataItems) => {
          const data = dataItems.payload.doc.data(),
            id = dataItems.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  public updateStatus(id) {
    let tempNotifications = [];
    if (
      localStorage.getItem(id + 'notifications') !== undefined &&
      localStorage.getItem(id + 'notifications') !== null
    ) {
      tempNotifications = JSON.parse(
        localStorage.getItem(id + 'notifications')
      );
    }
    let batch = this.Afs.firestore.batch();
    tempNotifications.forEach((item) => {
      batch.update(this.Afs.firestore.collection('notifications').doc(item), {
        isNew: false,
      });
    });
    batch.commit();
  }
}
