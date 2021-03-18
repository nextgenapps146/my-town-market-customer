import { Component, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "src/services/category.service";
import { ProductService } from "src/services/product.service";
import { StoreService } from "src/services/store.service";
import { UtilityService } from "src/services/utility.service";
@Component({
  selector: "app-search-product-result",
  templateUrl: "./search-product-result.page.html",
  styleUrls: ["./search-product-result.page.scss"],
})
export class SearchProductResultPage {
  searchKey = "";
  products = [];
  searchResults = [];
  excludedcategories = [];
  excludedproducts = [];
  categorySettings = [];
  priceChangePercent = 0;
  totalQuantity = 0;
  qpMap = {};

  @Output()
  addItemEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private categoryService: CategoryService,
    private productService: ProductService,
    public utils: UtilityService
  ) {}

  ionViewDidEnter() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchKey = params["search"];
      this.getProductResults();
    });
  }

  getProductResults() {
    this.storeService
      .getStoreInfo(localStorage.getItem("storeid"))
      .then((result) => {
        if (result !== undefined) {
          result.subscribe((res) => {
            this.excludedcategories = res["excludedcategories"] || [];
            this.excludedproducts = res["excludedproducts"] || [];
            this.categorySettings = res["categorysettings"] || [];
            this.priceChangePercent = res["pricechangepercent"];
            this.getItems();
          });
        }
      });
  }

  getItems() {
    let tempCategories = [];
    let availableCategories = [];
    let tempProducts = [];
    this.categoryService.getCategories().subscribe((categories) => {
      tempCategories = categories || [];
      for (let category of tempCategories) {
        if (this.excludedcategories.indexOf(category.id) === -1) {
          availableCategories.push(category.id);
        }
      }
      this.productService.getProducts().subscribe((products) => {
        tempProducts = products || [];
        this.products = tempProducts.filter(
          (x) => availableCategories.indexOf(x.prodcat) > -1
        );
        if (this.products !== undefined && this.products !== null) {
          this.products = this.products.filter(
            (x) => this.excludedproducts.indexOf(x.prodcat) === -1
          );
          let tempIndex = -1;
          for (let item of this.products) {
            tempIndex = this.categorySettings.findIndex(
              (x) => x.id === item.prodcat
            );
            if (tempIndex > -1) {
              item.saleprice =
                (item.saleprice *
                  (100 + this.categorySettings[tempIndex].percent)) /
                100;
            } else {
              item.saleprice =
                (item.saleprice * (100 + this.priceChangePercent)) / 100;
            }
          }
          this.searchResults = this.products.filter(
            (x) =>
              x.name.toLowerCase().indexOf(this.searchKey.toLocaleLowerCase()) >
              -1
          );
        }
      });
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

  onItemAdd(event) {
    this.refreshCart();
    this.addItemEvent.emit(event);
  }

  refreshCart(): void {
    this.utils.getQPMap().subscribe((val) => {
      this.qpMap = val;
      if (this.qpMap["totalQuantity"] === undefined) {
        this.qpMap["totalQuantity"] = 0;
      }
      this.totalQuantity = this.qpMap["totalQuantity"];
    });
  }
}
