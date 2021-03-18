import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { NotificationService } from "src/services/notification.service";
import { OrderService } from "src/services/order.service";
import { UtilityService } from "src/services/utility.service";

@Component({
  selector: "app-payment-mode",
  templateUrl: "./payment-mode.page.html",
  styleUrls: ["./payment-mode.page.scss"],
})
export class PaymentModePage implements OnInit {
  uid = "";
  specialInstruction: "";
  selectedDelivery = "";
  selectedPayment = "";
  selectedAddress = "";
  qpMap: any;
  orderStatus = "";

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private utils: UtilityService,
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.uid = localStorage.getItem("uid");
    this.selectedAddress = localStorage.getItem(this.uid + "selectedaddress");
    this.selectedDelivery = localStorage.getItem(this.uid + "selecteddelivery");
    this.selectedPayment = "pod";
    this.utils.getQPMap().subscribe((val) => {
      this.qpMap = val;
    });
  }

  async pay() {
    const alert = await this.alertController.create({
      cssClass: "",
      header: "Confirm!",
      message: "Are you sure you want to place the order?",
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

  confirm() {
    let finalOrder = {};
    const randomNumber = this.utils.getRandomNumber();
    if (this.specialInstruction === undefined) {
      this.specialInstruction = "";
    }
    finalOrder["id"] = randomNumber;
    finalOrder["items"] = this.qpMap["totalCart"];
    finalOrder["totalitemsquantity"] = this.qpMap["totalQuantity"];
    finalOrder["totalcharges"] = this.qpMap["totalPrice"];
    finalOrder["orderplaceddate"] = new Date();
    finalOrder["customername"] = localStorage.getItem("name");
    finalOrder["customerphone"] = localStorage.getItem("phonenumber");
    finalOrder["customerid"] = this.uid;
    finalOrder["storeid"] = localStorage.getItem("storeid");
    finalOrder["storename"] = localStorage.getItem("storename");
    finalOrder["storeadminid"] = localStorage.getItem("storeadmin");
    finalOrder["status"] = "Pending";
    finalOrder["deliverystatus"] = "nd"; // means not delivered
    finalOrder["paymentmode"] = this.selectedPayment;
    finalOrder["deliverytype"] = this.selectedDelivery;
    finalOrder["specialinstruction"] = this.specialInstruction;
    finalOrder["orderaddress"] = this.selectedAddress;
    

    console.log (finalOrder) // added to check error
    this.orderService
      .placeOrder(randomNumber, finalOrder)
      .then(async () => {
        finalOrder["id"] = randomNumber;
        this.orderService.saveOrderToStorage(this.uid, finalOrder);
        this.orderStatus = "success";
        this.utils.setQPMap({});
        let notification = {
          from: this.uid,
          to: JSON.parse(localStorage.getItem("storeadmin")),
          type: "order",
          status: "new",
          orderid: randomNumber,
          message: "A new order (ID: " + randomNumber + ") has been created",
          isNew: true,
          createdon: new Date(),
        };
        this.notificationService.addNotification(notification);
        this.navCtrl.navigateRoot(["./order-confirm"]);
      })
      .catch((err) => {
        this.orderStatus = "failure";
        this.utils.showToast("Sorry! Some problem in placing your order");
        console.log(err);
      });
  }
}
