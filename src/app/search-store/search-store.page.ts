import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-search-store",
  templateUrl: "./search-store.page.html",
  styleUrls: ["./search-store.page.scss"],
})
export class SearchStorePage {
  uid = "";
  recentSearches = [];
  searchText = "";

  constructor(private route: Router) {}

  ionViewDidEnter() {
    this.searchText = "";
    this.uid = localStorage.getItem("uid");
    this.getRecentSearches();
  }

  getRecentSearches() {
    if (
      localStorage.getItem(this.uid + "recentstoresearches") === null ||
      localStorage.getItem(this.uid + "recentstoresearches") === undefined
    ) {
      this.recentSearches = [];
    } else {
      this.recentSearches = JSON.parse(
        localStorage.getItem(this.uid + "recentstoresearches")
      );
    }
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
        this.uid + "recentstoresearches",
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
      this.uid + "recentstoresearches",
      JSON.stringify(this.recentSearches)
    );
    const navigationExtras = {
      queryParams: {
        search: searchKey,
      },
    };
    this.route.navigate(["./search-store-result"], navigationExtras);
  }

  item() {
    this.route.navigate(["./item"]);
  }
}
