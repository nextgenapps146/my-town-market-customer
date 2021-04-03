import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AuthService } from "src/services/auth.service";
import { NotificationService } from "src/services/notification.service";
import { StoreService } from "src/services/store.service";
import { UtilityService } from "src/services/utility.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage {
  uid = "";
  city = "";
  locality = "";
  nearbyStores = [];
  visitedStores = [];
  selectedStore: any;
  totalCartItems = 0;
  newNotificationCount = 0;
  notifications = [];
  qpMap = {};
  shop: any;
  isLoggedIn = false;

  constructor(
    private route: Router,
    private storeService: StoreService,
    private notificationService: NotificationService,
    private utils: UtilityService,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ionViewDidEnter() {
    localStorage.setItem('currentpage', 'home');
    this.isLoggedIn = this.authService.checkLogin();
    this.uid = localStorage.getItem("uid");
    this.city = localStorage.getItem("city");
    this.locality = localStorage.getItem("locality");
    this.utils.getQPMap().subscribe((res) => {
      if (res !== undefined) {
        this.qpMap = res;
        this.totalCartItems = res.totalQuantity;
      }
    });
    this.getAllNearbyStores();
    this.getAllVisitedStores();
  }

  getAllNearbyStores() {
    this.storeService.getLocalStores(this.locality).subscribe((data) => {
      this.nearbyStores = data;
      this.getAllNotifications();
    });
  }

  getAllVisitedStores() {
    if (JSON.parse(localStorage.getItem(this.uid + "storesvisited")) !== null) {
      this.visitedStores = JSON.parse(
        localStorage.getItem(this.uid + "storesvisited")
      );
    }
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
          JSON.parse(localStorage.getItem(this.uid + 'orders')) !== undefined &&
          JSON.parse(localStorage.getItem(this.uid + 'orders')) !== null
        ) {
          tempOrders = JSON.parse(localStorage.getItem(this.uid + 'orders'));
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
            this.notifications[i].type === 'order'
          ) {
            tempIndex = tempOrders.findIndex(
              (x) => x.id === this.notifications[i].orderid
            );
            if (tempIndex > -1) {
              tempOrders[tempIndex].status = this.notifications[i].status;
              if (this.notifications[i].newTotalCharges !== undefined && this.notifications[i].newTotalCharges !== null) {
                tempOrders[tempIndex].totalcharges = this.notifications[i].newTotalCharges;
              }
              if (this.notifications[i].newTotalQuantity !== undefined && this.notifications[i].newTotalQuantity !== null) {
                tempOrders[tempIndex].totalitemsquantity = this.notifications[i].newTotalQuantity;
              }
            }
          }
        }

        if (this.uid !== undefined && this.uid !== null) {
          localStorage.setItem(
            this.uid + 'notifications',
            JSON.stringify(tempNotifications)
          );
          localStorage.setItem(this.uid + 'orders', JSON.stringify(tempOrders));
        }
        this.newNotificationCount = count;
      });
  }

  changeLocation() {
    this.route.navigate(["./location"]);
  }

  item_details() {
    this.route.navigate(["./item-detail"]);
  }

  item() {
    this.route.navigate(["./item"]);
  }

  search() {
    this.route.navigate(["./search-store"]);
  }

  show_notifications() {
    this.route.navigate(["./notifications"]);
  }

  cart() {
    this.route.navigate(["./cart"]);
  }

  async goToShop(shop) {
    this.selectedStore = shop;
    const prevStoreId = localStorage.getItem("storeid");
    if (
      this.totalCartItems > 0 &&
      prevStoreId !== null &&
      prevStoreId !== undefined &&
      prevStoreId !== shop.id
    ) {
      const alert = await this.alertController.create({
        cssClass: "",
        header: "Confirm!",
        message:
          "If you visit a different store, your cart will be cleared. Do you want to proceed?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "",
            handler: () => {},
          },
          {
            text: "Okay",
            handler: () => {
              this.confirm();
            },
          },
        ],
      });
      await alert.present();
    } else {
      localStorage.setItem("storeid", this.selectedStore.id);
      localStorage.setItem("storename", this.selectedStore.name);
      localStorage.setItem("storeadmin",this.selectedStore.adminid);
      localStorage.setItem("bizcat", this.selectedStore.bizcat);
      if (this.uid !== undefined && this.uid !== null) {
        let tempIndex = -1;
        let tempstores =
          JSON.parse(localStorage.getItem(this.uid + "storesvisited")) || [];
        tempIndex = tempstores.findIndex((x) => x.id === shop.id);
        if (tempIndex === -1) {
          tempstores.push(shop);
        }
        localStorage.setItem(
          this.uid + "storesvisited",
          JSON.stringify(tempstores)
        );
      }
      const navigationExtras = {
        queryParams: {
          shopId: this.selectedStore.id, // shop.id goes here
        },
      };
      this.route.navigate(["shop"], navigationExtras);
    }
  }

  confirm(): void {
    this.utils.setQPMap({});
    localStorage.setItem("storeid", this.selectedStore.id);
    localStorage.setItem("storename", this.selectedStore.name);
    localStorage.setItem("storeadmin", JSON.stringify(this.selectedStore.adminid));
    localStorage.setItem("bizcat", this.selectedStore.bizcat);
    if (this.uid !== undefined && this.uid !== null) {
      let tempIndex = -1;
      let tempstores =
        JSON.parse(localStorage.getItem(this.uid + "storesvisited")) || [];
      tempIndex = tempstores.findIndex((x) => x.id === this.selectedStore.id);
      if (tempIndex === -1) {
        tempstores.push(this.selectedStore);
      }
      localStorage.setItem(
        this.uid + "storesvisited",
        JSON.stringify(tempstores)
      );
    }
    const navigationExtras = {
      queryParams: {
        shopId: this.selectedStore.id,
      },
    };
    this.route.navigate(["shop"], navigationExtras);
  }
}
