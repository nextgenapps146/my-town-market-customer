import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.page.html',
  styleUrls: ['./seller-info.page.scss'],
})
export class SellerInfoPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

 item_details() {
    this.route.navigate(['./item-detail']);
  } 
 cart() {
    this.route.navigate(['./cart']);
  } 	
}
