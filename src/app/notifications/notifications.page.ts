import { Component } from "@angular/core";
import { NotificationService } from "src/services/notification.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.page.html",
  styleUrls: ["./notifications.page.scss"],
})
export class NotificationsPage {
  uid = "";
  notifications = [];
  newNotificationCount = 0;

  constructor(private notificationService: NotificationService) {}

  ionViewDidEnter() {
    this.uid = localStorage.getItem("uid");
    this.notificationService.updateStatus(this.uid);
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.notificationService
      .getNotificationsByUserId(this.uid)
      .subscribe((data) => {
        this.notifications = data || [];
        if (this.notifications !== undefined && this.notifications !== null) {
          this.notifications.sort((a, b) =>
            a.createdon > b.createdon ? -1 : b.createdon > a.createdon ? 1 : 0
          );
        }
        let count = 0;
        let tempIndex = -1;
        let tempOrders = [];
        if (
          JSON.parse(localStorage.getItem(this.uid + "orders")) !== undefined &&
          JSON.parse(localStorage.getItem(this.uid + "orders")) !== null
        ) {
          tempOrders = JSON.parse(localStorage.getItem(this.uid + "orders"));
        }

        let tempNotifications = [];
        for (let i = this.notifications.length - 1; i >= 0; i--) {
          tempNotifications.push(this.notifications[i].id);
          tempIndex = -1;
          if (
            this.notifications[i] !== undefined &&
            this.notifications[i].isNew
          ) {
            count++;
          }
          if (
            this.notifications[i] !== undefined &&
            this.notifications[i].type === "order"
          ) {
            tempIndex = tempOrders.findIndex(
              (x) => x.id === this.notifications[i].orderid
            );
            if (tempIndex > -1) {
              tempOrders[tempIndex].status = this.notifications[i].status;
              if (
                this.notifications[i].newTotalCharges !== undefined &&
                this.notifications[i].newTotalCharges !== null
              ) {
                tempOrders[tempIndex].totalcharges = this.notifications[
                  i
                ].newTotalCharges;
              }
              if (
                this.notifications[i].newTotalQuantity !== undefined &&
                this.notifications[i].newTotalQuantity !== null
              ) {
                tempOrders[tempIndex].totalitemsquantity = this.notifications[
                  i
                ].newTotalQuantity;
              }
            }
          }
        }

        if (this.uid !== undefined && this.uid !== null) {
          localStorage.setItem(
            this.uid + "notifications",
            JSON.stringify(tempNotifications)
          );
          localStorage.setItem(this.uid + "orders", JSON.stringify(tempOrders));
        }
        this.newNotificationCount = count;
      });
  }
}
