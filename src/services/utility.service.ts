import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  quantitiesAndProductsMap = new BehaviorSubject<any>({});
  finalprice =0;
  constructor(public toast: ToastController) {}

  getQPMap(): BehaviorSubject<any> {
    return this.quantitiesAndProductsMap;
  }

  setQPMap(value: any): void {
    this.quantitiesAndProductsMap.next(value);
  }

  getRandomNumber() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  showToast(msg) {
    this.toast
      .create({
        message: msg,
        duration: 2000,
      })
      .then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
  }
}
