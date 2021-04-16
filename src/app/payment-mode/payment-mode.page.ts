import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { NotificationService } from "src/services/notification.service";
import { OrderService } from "src/services/order.service";
import { UtilityService } from "src/services/utility.service";

import { WebIntent } from '@ionic-native/web-intent/ngx';

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

  payeeVPA: string;
  payeeName: string;
  transactionNote: string = 'Payment for Groceries';
  payAmount: number;
  currency: string = 'INR';
  transactionReference: string;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private utils: UtilityService,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private webIntent: WebIntent
  ) {}

  ngOnInit() {
    this.uid = localStorage.getItem("uid");
    this.selectedAddress = localStorage.getItem(this.uid + "selectedaddress");
    this.selectedDelivery = localStorage.getItem(this.uid + "selecteddelivery");
    this.selectedPayment = localStorage.getItem(this.uid + 'selectedpayment')
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

  async paytm() {
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
    let packages = {
      'paytm': 'net.one97.paytm',
      'google': 'com.google.android.apps.nbu.paisa.user',
      'whatsapp': 'com.whatsapp'
  };
  this.payeeVPA = '7095959589@okbizaxis';
  this.payeeName = 'MyTownMarket';
  this.payAmount =this.utils.finalprice;
  this.transactionReference = '87148172'; //ORDER ID or Something similar
  const url = 'upi://pay?pa=' + this.payeeVPA + '&pn=' + this.payeeName + '&tr=' + this.transactionReference + 'tn=' + this.transactionNote + '&am=' + this.payAmount + '&cu=' + this.currency;
  const options = {
      action: this.webIntent.ACTION_VIEW,
      url,
      package: packages.paytm
  };
  this.webIntent.startActivityForResult(options).then(success => {
    console.log(success);
    if(success.extras.Status == 'SUCCESS') {
      // SUCCESS RESPONSE
      this.confirm();
      this.utils.showToast("Payment Successful");
    } else if(success.extras.Status == 'SUBMITTED') {
      // SUBMITTED RESPONSE
    } else if(success.extras.Status == 'Failed' || success.extras.Status == 'FAILURE') {
      // FAILED RESPONSE
      this.orderStatus = "Payment Failed";
        this.utils.showToast("Sorry! Some problem in placing your order");
    } else {
      this.orderStatus = "Payment Failed";
        this.utils.showToast("Sorry! Some problem in placing your order");
      // FAILED RESPONSE
    }
  }, error => {
    console.log(error);
  });
          },
        },
      ],
    });
    await alert.present();
  }

//  async googlepay() {
//     const alert = await this.alertController.create({
//       cssClass: "",
//       header: "Confirm!",
//       message: "Are you sure you want to place the order?",
//       buttons: [
//         {
//           text: "Cancel",
//           role: "cancel",
//           cssClass: "",
//           handler: () => {},
//         },
//         {
//           text: "Okay",
//           handler: () => {
           
//     let packages = {
//       'paytm': 'net.one97.paytm',
//       'google': 'com.google.android.apps.nbu.paisa.user',
//       'whatsapp': 'com.whatsapp'
//   };
//   this.payeeVPA = '7095959589@okbizaxis';
//   this.payeeName = 'MyTownMarket';
//   this.payAmount = this.utils.finalprice;
//   this.transactionReference = '87148172'; //ORDER ID or Something similar
//   const url = 'upi://pay?pa=' + this.payeeVPA + '&pn=' + this.payeeName + '&tr=' + this.transactionReference + 'tn=' + this.transactionNote + '&am=' + this.payAmount + '&cu=' + this.currency;
//   const options = {
//       action: this.webIntent.ACTION_VIEW,
//       url,
//       package: packages.google
//   };
//   this.webIntent.startActivityForResult(options).then(success => {
//     console.log(success);
//     if(success.extras.Status == 'SUCCESS') {
//       // SUCCESS RESPONSE
//       this.confirm();
//       this.utils.showToast("Payment Successful");
//     } else if(success.extras.Status == 'SUBMITTED') {
//       // SUBMITTED RESPONSE
//     } else if(success.extras.Status == 'Failed' || success.extras.Status == 'FAILURE') {
//       // FAILED RESPONSE
//       this.orderStatus = "Payment Failed";
//         this.utils.showToast("Sorry! Some problem in placing your order");
//     } else {
//       // FAILED RESPONSE
//       this.orderStatus = "Payment Failed";
//         this.utils.showToast("Sorry! Some problem in placing your order");
//     }
//   }, error => {
//     console.log(error);
//   });
//           },
//         },
//       ],
//     });
//     await alert.present();
// }

// async phonepe() {
//   const alert = await this.alertController.create({
//     cssClass: "",
//     header: "Confirm!",
//     message: "Are you sure you want to place the order?",
//     buttons: [
//       {
//         text: "Cancel",
//         role: "cancel",
//         cssClass: "",
//         handler: () => {},
//       },
//       {
//         text: "Okay",
//         handler: () => {
          
//   let packages = {
//     'paytm': 'net.one97.paytm',
//     'google': 'com.google.android.apps.nbu.paisa.user',
//     'phonepe': 'com.phonepe.app'
// };
// this.payeeVPA = '7095959589@okbizaxis';
// this.payeeName = 'MyTownMarket';
// this.payAmount = this.utils.finalprice;
// this.transactionReference = '87148172'; //ORDER ID or Something similar
// const url = 'upi://pay?pa=' + this.payeeVPA + '&pn=' + this.payeeName + '&tr=' + this.transactionReference + 'tn=' + this.transactionNote + '&am=' + this.payAmount + '&cu=' + this.currency;
// const options = {
//     action: this.webIntent.ACTION_VIEW,
//     url,
//     package: packages.phonepe
// };
// this.webIntent.startActivityForResult(options).then(success => {
//   console.log(success);
//   if(success.extras.Status == 'SUCCESS') {
//     // SUCCESS RESPONSE 
//     this.confirm();
//     this.utils.showToast("Payment Successful");
//   } else if(success.extras.Status == 'SUBMITTED') {
//     // SUBMITTED RESPONSE
//   } else if(success.extras.Status == 'Failed' || success.extras.Status == 'FAILURE') {
//     // FAILED RESPONSE
//     this.orderStatus = "Payment Failed";
//         this.utils.showToast("Sorry! Some problem in placing your order");
//   } else {
//     // FAILED RESPONSE
    
//   }
// }, error => {
//   console.log(error);
// });
//         },
//       },
//     ],
//   });
//   await alert.present();
// }


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
    // finalOrder["storeadminid"] = localStorage.getItem("storeadmin");
    finalOrder["status"] = "Pending";
    finalOrder["deliverystatus"] = "nd"; // means not delivered
    finalOrder["paymentmode"] = this.selectedPayment;
    finalOrder["deliverytype"] = this.selectedDelivery;
    finalOrder["specialinstruction"] = this.specialInstruction;
    finalOrder["orderaddress"] = this.selectedAddress;
        // finalOrder["storeadmin"] = "r0IV6yjYXKf6cV90YCPcUTPcvx32";
        finalOrder["storeadmin"] = localStorage.getItem("storeadmin");
    

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
          to: localStorage.getItem("storeadmin"),
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
