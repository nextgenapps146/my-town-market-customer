import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.page.html',
  styleUrls: ['./order-confirm.page.scss'],
})
export class OrderConfirmPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  home() {
    this.navCtrl.navigateRoot(['./home']);
  }  
  my_orders() {
    this.navCtrl.navigateRoot(['./my-orders']);
  } 
}
