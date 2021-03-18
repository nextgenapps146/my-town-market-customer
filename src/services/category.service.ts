import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  productCategoryRef: AngularFirestoreCollection;

  constructor(public Afs: AngularFirestore) {}

  getProductCategories(bizcat: string) {
    this.productCategoryRef = this.Afs.collection("categories", (ref) =>
      ref.where("bizcat", "==", bizcat)
    );
    return this.productCategoryRef.snapshotChanges().pipe(
      map((res) =>
        res.map((dataItems) => {
          const data = dataItems.payload.doc.data(),
            id = dataItems.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getCategories() {
    this.productCategoryRef = this.Afs.collection(
      'categories'
    );
    return this.productCategoryRef.snapshotChanges().pipe(
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
