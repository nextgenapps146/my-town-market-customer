import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

 cart() {
    this.route.navigate(['./cart']);
  } 
 item_details() {
    this.route.navigate(['./item-detail']);
  }  
}
