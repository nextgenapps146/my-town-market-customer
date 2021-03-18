import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  storeRef: AngularFirestoreCollection;

  constructor(public Afs: AngularFirestore) {}

  getLocalStores(locality) {
    this.storeRef = this.Afs.collection("stores", (ref) =>
      ref.where("locality", "==", locality)
    );
    return this.storeRef.snapshotChanges().pipe(
      map((res) =>
        res.map((dataItems) => {
          const data = dataItems.payload.doc.data(),
            id = dataItems.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  public async getStoreInfo(shopId) {
    if (shopId) {
      this.storeRef = this.Afs.collection("stores");
      return this.storeRef
        .doc(shopId)
        .snapshotChanges()
        .pipe(
          map((res: any) => {
            const result = res.payload.data();
            if (result) {
              result.id = res.payload.id;
            }
            return result;
          })
        );
    }
  }
}
