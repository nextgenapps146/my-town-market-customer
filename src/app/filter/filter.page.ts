import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

 item() {
    this.route.navigate(['./item']);
  } 
 cart() {
    this.route.navigate(['./cart']);
  } 
 item_details() {
    this.route.navigate(['./item-detail']);
  } 
}
