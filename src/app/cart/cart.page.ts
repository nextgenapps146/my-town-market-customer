import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/services/auth.service";
import { UtilityService } from "src/services/utility.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage {
  qpMap = {};
  items: any[];
  totalItems = 0;
  totalPrice = 0;
  deliveryFee = 0;
  discount = 0;
  finalPrice = 0;
  isLoggedIn = false;

  @Output()
  updateItemEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: Router,
    public utils: UtilityService,
    private authService: AuthService
  ) {}

  ionViewDidEnter() {
    localStorage.setItem('currentpage', 'cart');
    this.isLoggedIn = this.authService.checkLogin();
    this.utils.getQPMap().subscribe((value) => {
      this.qpMap = value;
      this.items = this.qpMap["totalCart"];
      this.totalItems = this.qpMap["totalQuantity"];
      this.totalPrice = this.qpMap["totalPrice"];
      this.finalPrice = this.totalPrice + this.discount + this.deliveryFee;
    });
  }

  onItemUpdate(event): void {
    this.finalPrice = this.totalPrice + this.discount + this.deliveryFee;
    this.updateItemEvent.emit(event);
  }

  select_address() {
    if (this.isLoggedIn) {
      this.route.navigate(["./select-address"]);
    } else {
      this.route.navigate(["./sign-in"]);
    }
  }
}
