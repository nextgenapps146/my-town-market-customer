import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
FavoriteIcon = false;
  constructor(private route: Router) { }

  ngOnInit() {
  }

 toggleFavoriteIcon(){
   this.FavoriteIcon = !this.FavoriteIcon;
   }
	
cart() {
    this.route.navigate(['./cart']);
  } 
reviews() {
    this.route.navigate(['./reviews']);
  } 
seller_info() {
    this.route.navigate(['./seller-info']);
  } 
}
