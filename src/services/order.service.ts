import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  orderRef: AngularFirestoreCollection;

  constructor(public Afs: AngularFirestore) {}

  public async placeOrder(orderId, record) {
    this.orderRef = this.Afs.collection("orders");
    await this.orderRef.doc(orderId).set(record);
  }

  public saveOrderToStorage(userId, record) {
    let allOrders = this.getSavedOrders(userId) || [];
    allOrders.unshift(record);
    localStorage.setItem(userId + "orders", JSON.stringify(allOrders));
  }

  public getSavedOrders(userId) {
    return JSON.parse(localStorage.getItem(userId + "orders"));
  }
}
