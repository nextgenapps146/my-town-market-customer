import { Component } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "src/services/auth.service";
import { UtilityService } from "src/services/utility.service";
// import { FCMService } from "src/services/fcm.service";
import { AngularFirestore } from "@angular/fire/firestore";

import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.page.html",
  styleUrls: ["./sign-in.page.scss"],
})
export class SignInPage {
  phoneNumber = "";
  otp = "";
  verificationId: any;
  isOTPRequested = false;
  enableResend = false;
  remainingSecond = 60;
  interval: any;
  params: any;

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    private authService: AuthService,
    private utilityService: UtilityService,
    private route: Router,

    private afs: AngularFirestore
  ) {}

  home() {
    this.navCtrl.navigateRoot(["./home"]);
  }

  sign_up() {
    this.route.navigate(["./sign-up"]);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  sign_in() {
    if (this.interval !== undefined) {
      clearInterval(this.interval);
    }
    if (
      this.phoneNumber === undefined ||
      this.phoneNumber === null ||
      this.phoneNumber === ""
    ) {
      this.utilityService.showToast("Phone number is required");
    } else {
      this.utilityService.showToast("OTP request is sent");
      this.isOTPRequested = true;
      this.enableResend = false;
      this.remainingSecond = 60;
      this.authService.getOtp(this.phoneNumber).then(
        (res) => {
          this.verificationId = res.verificationId;
        },
        (err) => {
          alert(err);
        }
      );
      this.interval = setInterval(() => {
        this.remainingSecond = this.remainingSecond - 1;
        if (this.remainingSecond === 0) {
          this.enableResend = true;
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }

  confirm_otp() {
    if (this.otp === undefined || this.otp === null || this.otp === "") {
      this.utilityService.showToast("OTP is required");
    } else {
      this.authService.verifyOtp(this.verificationId, this.otp).then(
        (res) => {
          this.authService.getUserInfo().then(
            (info) => {
              this.checkUser(info);
            },
            (err) => {
              alert(err);
            }
          );
        },
        (err) => {
          alert(err);
        }
      );
    }
  }

  checkUser(info) {
    localStorage.setItem("uid", info["uid"]);
    FCM.getToken().then((token) => {
      console.log(token);
      if (
        localStorage.getItem("uid") !== null &&
        localStorage.getItem("uid") !== undefined
      ) {
        this.saveTokenToFirestore(token, localStorage.getItem("uid"));
      }
    });
    this.authService.checkUser(info.uid).subscribe((res) => {
      this.isOTPRequested = false;
      this.otp = "";
      this.verificationId = "";
      this.enableResend = false;
      this.remainingSecond = 60;
      if (res === undefined) {
        this.route.navigate(["./sign-up"]);
      } else {
        localStorage.setItem("isloggedin", "true");
        localStorage.setItem("phonenumber", info["phoneNumber"]);
        this.routeUser();
      }
    });
  }

  routeUser() {
    if (
      localStorage.getItem("currentpage") === null ||
      localStorage.getItem("currentpage") === undefined ||
      localStorage.getItem("currentpage") === "home"
    ) {
      this.route.navigate(["home"]);
    } else if (localStorage.getItem("currentpage") === "cart") {
      this.route.navigate(["cart"]);
    } else if (localStorage.getItem("currentpage") === "shop") {
      const navigationExtras = {
        queryParams: {
          shopId: localStorage.getItem("storeid"),
        },
      };
      this.route.navigate(["shop"], navigationExtras);
    } else if (localStorage.getItem("currentpage") === "products") {
      const navigationExtras = {
        queryParams: {
          shopId: localStorage.getItem("storeid"),
          categoryId: localStorage.getItem("categoryid"),
          categoryName: localStorage.getItem("categoryname"),
        },
      };
      this.route.navigate(["products"], navigationExtras);
    } else if (localStorage.getItem("currentpage") === "select-address") {
      this.route.navigate(["select-address"]);
    } else if (localStorage.getItem("currentpage") === "offers") {
      this.route.navigate(["offers"]);
    } else {
      this.route.navigate(["home"]);
    }
  }
  saveTokenToFirestore(token, uid) {
    if (!token) return;
    const devicesRef = this.afs.collection("devices");
    const docData = {
      token,
      userid: uid,
    };
    return devicesRef.doc(uid).set(docData);
  }
}
