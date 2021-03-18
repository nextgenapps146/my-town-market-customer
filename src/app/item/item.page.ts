import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

 cart() {
    this.route.navigate(['./cart']);
  } 
 item_details() {
    this.route.navigate(['./item-detail']);
  }  
 filter() {
    this.route.navigate(['./filter']);
  } 
}
