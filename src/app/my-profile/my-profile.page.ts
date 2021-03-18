import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.page.html",
  styleUrls: ["./my-profile.page.scss"],
})
export class MyProfilePage {
  uid = "";
  userName = "";
  userPhone = "";
  addresses = [];
  defaultAddress = 0;
  selectedAddress = -1;

  constructor(
    private route: Router,
    private alertController: AlertController
  ) {}

  ionViewDidEnter() {
    this.uid = localStorage.getItem("uid");
    this.userName = localStorage.getItem("name");
    this.userPhone = localStorage.getItem("phonenumber");
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

  async deleteAddress(index, event) {
    event.stopPropagation();
    this.selectedAddress = index;
    const alert = await this.alertController.create({
      cssClass: "",
      header: "Confirm!",
      message: "Are you sure you want to delete?",
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
  }

  confirm(): void {
    if (this.selectedAddress === this.defaultAddress) {
      this.defaultAddress = -1;
    }
    let tempAddresses = this.addresses;
    tempAddresses.splice(this.selectedAddress, 1);
    localStorage.setItem(
      this.uid + "addresses",
      JSON.stringify({ items: this.addresses, selected: this.defaultAddress })
    );
  }

  add_address() {
    const navigationExtras = {
      queryParams: {
        from: "profile",
      },
    };
    this.route.navigate(["./add-address"], navigationExtras);
  }
}
