import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "src/services/store.service";
@Component({
  selector: "app-search-store-result",
  templateUrl: "./search-store-result.page.html",
  styleUrls: ["./search-store-result.page.scss"],
})
export class SearchStoreResultPage {
  locality = "";
  searchKey = "";
  stores = [];
  searchResults = [];

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {}

  ionViewDidEnter() {
    this.locality = localStorage.getItem("locality");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchKey = params["search"];
      this.getStoreResults();
    });
  }

  getStoreResults() {
    this.storeService.getLocalStores(this.locality).subscribe((data) => {
      this.stores = data;
      this.searchResults = this.stores.filter(
        (x) => x.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) > -1
      );
    });
  }

  item_details(id: string) {
    const navigationExtras = {
      queryParams: {
        shopId: id,
      },
    };
    this.route.navigate(["shop"], navigationExtras);
  }

  search() {
    this.route.navigate(["./search-store"]);
  }
}
