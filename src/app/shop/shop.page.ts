import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "src/services/category.service";
import { ProductService } from "src/services/product.service";
import { StoreService } from "src/services/store.service";
import { UtilityService } from "src/services/utility.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.page.html",
  styleUrls: ["./shop.page.scss"],
})
export class ShopPage implements OnInit {
  shopId = "";
  storeInfo: any;
  categoryInfo = [];
  excludedcategories = [];
  excludedproducts = [];
  excludedpopularproducts = [];
  popularProducts = [];
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

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      localStorage.setItem("currentpage", "shop");
      this.shopId = params["shopId"];
      this.getStoreInfo();
    });
    this.refreshCart();
  }

  getStoreInfo(): void {
    this.storeService.getStoreInfo(this.shopId).then((data) => {
      data.subscribe((data) => {
        if (data !== undefined) {
          this.storeInfo = data;
          this.excludedcategories = data["excludedcategories"] || [];
          this.excludedproducts = data["excludedproducts"] || [];
          this.excludedpopularproducts = data["excludedpopularproducts"] || [];
          this.categorySettings = data["categorysettings"] || [];
          this.priceChangePercent = data["pricechangepercent"];

          if (this.storeInfo !== undefined) {
            this.getProductCategories();
            this.getPopularProducts();
          }
        }
      });
    });
  }

  getProductCategories() {
    this.categoryService
      .getProductCategories(this.storeInfo.bizcat)
      .subscribe((categoryData) => {
        if (categoryData !== undefined) {
          this.categoryInfo = categoryData.filter(
            (x) => this.excludedcategories.indexOf(x.id) === -1
          );
        }
      });
  }

  getPopularProducts() {
    this.productService
      .getPopularProducts(this.storeInfo.bizcat)
      .subscribe((productData) => {
        if (productData !== undefined) {
          this.popularProducts = productData.filter(
            (x) => this.excludedcategories.indexOf(x["prodcat"]) === -1
          );
          this.popularProducts = this.popularProducts.filter(
            (x) => this.excludedproducts.indexOf(x.id) === -1
          );
          this.popularProducts = this.popularProducts.filter(
            (x) => this.excludedpopularproducts.indexOf(x.id) === -1
          );
          let tempIndex = -1;
          for (let item of this.popularProducts) {
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
        }
      });
  }

  showProductsFromCategory(categoryId: string, categoryName: string) {
    const navigationExtras = {
      queryParams: {
        shopId: this.shopId,
        categoryId: categoryId,
        categoryName: categoryName,
      },
    };
    this.route.navigate(["products"], navigationExtras);
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

  search() {
    this.route.navigate(["./search-product"]);
  }

  cart() {
    this.route.navigate(["./cart"]);
  }
}
