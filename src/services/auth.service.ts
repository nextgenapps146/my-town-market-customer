import { Injectable } from "@angular/core";
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { FirebaseAuthentication } from "@ionic-native/firebase-authentication/ngx";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  usersRef: AngularFirestoreCollection;

  constructor(
    private firebase: FirebaseX,
    private fireAuth: FirebaseAuthentication,
    private router: Router,
    public Afs: AngularFirestore
  ) {}

  checkLogin(): boolean {
    if (localStorage.getItem("isloggedin") === "true") {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem("isloggedin");
    localStorage.removeItem("phonenumber");
    localStorage.removeItem("uid");
    this.router.navigate(["./home"]);
  }

  getOtp(phoneNumber) {
    return this.firebase.verifyPhoneNumber("+" + phoneNumber, 60);
  }

  verifyOtp(verificationId, otp) {
    return this.fireAuth.signInWithVerificationId(
      verificationId,
      otp.toString()
    );
  }

  getUserInfo() {
    return this.firebase.getCurrentUser();
  }

  checkUser(userId) {
    if (userId) {
      this.usersRef = this.Afs.collection("users");
      return this.usersRef
        .doc(userId)
        .snapshotChanges()
        .pipe(
          map((res: any) => {
            const result = res.payload.data();
            if (result) {
              result.id = res.payload.id;
            }
            return result;
          })
        );
    }
  }

  createUser(name) {
    this.usersRef = this.Afs.collection("users");
    this.usersRef
      .doc(localStorage.getItem("uid"))
      .set({
        fullname: name,
        created_on: new Date(),
        role: "user",
      })
      .then((snapshot) => {
        localStorage.setItem("isloggedin", "true");
        localStorage.setItem(
          "phonenumber",
          localStorage.getItem("phonenumber")
        );
        localStorage.setItem("uid", localStorage.getItem("uid"));
        localStorage.setItem("name", name);
        this.router.navigate(["./home"]);
      });
  }
}
