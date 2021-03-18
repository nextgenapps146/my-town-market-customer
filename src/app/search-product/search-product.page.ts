import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryService } from "src/services/category.service";
import { StoreService } from "src/services/store.service";

@Component({
  selector: "app-search-product",
  templateUrl: "./search-product.page.html",
  styleUrls: ["./search-product.page.scss"],
})
export class SearchProductPage {
  uid = "";
  recentSearches = [];
  searchText = "";
  bizcat = "";
  categories = [];
  excludedcategories = [];

  constructor(
    private route: Router,
    private categoryService: CategoryService,
    private storeService: StoreService
  ) {}

  ionViewDidEnter() {
    this.searchText = "";
    this.uid = localStorage.getItem("uid");
    this.bizcat = localStorage.getItem("bizcat");
    this.getRecentSearches();
    this.getProductCategories();
  }

  getRecentSearches() {
    if (
      localStorage.getItem(this.uid + "recentproductsearches") === null ||
      localStorage.getItem(this.uid + "recentproductsearches") === undefined
    ) {
      this.recentSearches = [];
    } else {
      this.recentSearches = JSON.parse(
        localStorage.getItem(this.uid + "recentproductsearches")
      );
    }
  }

  getProductCategories() {
    this.storeService
      .getStoreInfo(localStorage.getItem("storeid"))
      .then((result) => {
        if (result !== undefined) {
          result.subscribe((res) => {
            this.excludedcategories = res["excludedcategories"] || [];
            this.categoryService
              .getProductCategories(this.bizcat)
              .subscribe((categoryData) => {
                if (categoryData !== undefined) {
                  this.categories = categoryData.filter(
                    (x) => this.excludedcategories.indexOf(x.id) === -1
                  );
                }
              });
          });
        }
      });
  }

  search() {
    if (
      this.searchText !== undefined &&
      this.searchText !== null &&
      this.searchText.trim() !== ""
    ) {
      if (this.recentSearches.indexOf(this.searchText) === -1) {
        if (this.recentSearches.length > 9) {
          this.recentSearches.pop();
        }
        this.recentSearches.unshift(this.searchText);
      } else {
        let index = this.recentSearches.indexOf(this.searchText);
        this.recentSearches.splice(index, 1);
        this.recentSearches.unshift(this.searchText);
      }
      localStorage.setItem(
        this.uid + "recentproductsearches",
        JSON.stringify(this.recentSearches)
      );
      this.search_result(this.searchText);
    }
  }

  search_result(searchKey: string) {
    let index = this.recentSearches.indexOf(searchKey);
    this.recentSearches.splice(index, 1);
    this.recentSearches.unshift(searchKey);
    localStorage.setItem(
      this.uid + "recentproductsearches",
      JSON.stringify(this.recentSearches)
    );
    const navigationExtras = {
      queryParams: {
        search: searchKey,
      },
    };
    this.route.navigate(["./search-product-result"], navigationExtras);
  }

  item() {
    this.route.navigate(["./item"]);
  }
}
