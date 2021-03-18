import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  productRef: AngularFirestoreCollection;

  constructor(public Afs: AngularFirestore) {}

  getPopularProducts(bizcat) {
    this.productRef = this.Afs.collection("products", (ref) =>
      ref.where("ispopular", "==", true)
      .where("bizcat", "==", bizcat)
    );
    return this.productRef.snapshotChanges().pipe(
      map((res) =>
        res.map((dataItems) => {
          const data = dataItems.payload.doc.data(),
            id = dataItems.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getProductsByCategory(categoryId: string) {
    this.productRef = this.Afs.collection("products", (ref) =>
      ref.where("prodcat", "==", categoryId)
    );
    return this.productRef.snapshotChanges().pipe(
      map((res) =>
        res.map((dataItems) => {
          const data = dataItems.payload.doc.data(),
            id = dataItems.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getProducts() {
    this.productRef = this.Afs.collection("products");
    return this.productRef.snapshotChanges().pipe(
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
