import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.page.html",
  styleUrls: ["./my-orders.page.scss"],
})
export class MyOrdersPage {
  uid = "";
  orders = [];
  constructor(private route: Router) {}

  ionViewDidEnter() {
    this.uid = localStorage.getItem("uid");
    this.getOrders();
  }

  getOrders() {
    if (JSON.parse(localStorage.getItem(this.uid + "orders")) !== null) {
      this.orders = JSON.parse(localStorage.getItem(this.uid + "orders"));
      if (this.orders !== undefined && this.orders !== null) {
        for (let order of this.orders) {
          order.faqExpand = false;
        }
      }
    }
  }

  faqExpandToggle(order) {
    order.faqExpand = !order.faqExpand;
  }
}
