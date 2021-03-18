import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  locationRef: AngularFirestoreCollection;

  constructor(public Afs: AngularFirestore) {}

  getCities() {
    this.locationRef = this.Afs.collection("availablecities");
    return this.locationRef.snapshotChanges().pipe(
      map((res) =>
        res.map((dataItems) => {
          const data = dataItems.payload.doc.data(),
            id = dataItems.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getLocalities(city) {
    this.locationRef = this.Afs.collection("availablelocalities", (ref) =>
      ref.where("city", "==", city)
    );
    return this.locationRef.snapshotChanges().pipe(
      map((res) =>
        res.map((dataItems) => {
          const data = dataItems.payload.doc.data(),
            id = dataItems.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
}
