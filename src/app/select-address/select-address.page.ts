import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "app-select-address",
  templateUrl: "./select-address.page.html",
  styleUrls: ["./select-address.page.scss"],
})
export class SelectAddressPage {
  uid = "";
  isLoggedIn = false;
  addresses = [];
  defaultAddress = 0;
  selectedAddress = "";
  selectedDelivery = "";

  constructor(private route: Router, private authService: AuthService) {}

  ionViewDidEnter() {
    localStorage.setItem('currentpage', 'select-address');
    this.uid = localStorage.getItem("uid");
    this.isLoggedIn = this.authService.checkLogin();
    this.getAllAddresses();
  }

  getAllAddresses() {
    if (
      localStorage.getItem(this.uid + "addresses") === null ||
      localStorage.getItem(this.uid + "addresses") === undefined
    ) {
      this.addresses = [];
    } else {
      this.addresses = JSON.parse(
        localStorage.getItem(this.uid + "addresses")
      ).items;
      this.defaultAddress = JSON.parse(
        localStorage.getItem(this.uid + "addresses")
      ).selected;
    }
  }

  payment_mode() {
    localStorage.setItem(this.uid + "selectedaddress", this.selectedAddress);
    localStorage.setItem(this.uid + "selecteddelivery", this.selectedDelivery);
    this.route.navigate(["./payment-mode"]);
  }

  add_address() {
    const navigationExtras = {
      queryParams: {
        from: "select",
      },
    };
    this.route.navigate(["./add-address"], navigationExtras);
  }

  login() {
    this.route.navigate(["./sign-in"]);
  }
}
