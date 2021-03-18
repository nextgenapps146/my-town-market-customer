import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "src/services/product.service";
import { StoreService } from "src/services/store.service";
import { UtilityService } from "src/services/utility.service";

@Component({
  selector: "app-item",
  templateUrl: "./product-list.page.html",
  styleUrls: ["./product-list.page.scss"],
})
export class ProductListPage implements OnInit {
  shopId = "";
  categoryId = "";
  categoryName = "";
  storeInfo: any;
  productList: any;
  excludedproducts = [];
  categorySettings = [];
  priceChangePercent = 0;
  totalQuantity = 0;
  qpMap = {};

  @Output()
  addItemEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private productService: ProductService,
    public utils: UtilityService,
    private route: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      localStorage.setItem('currentpage', 'products');
      localStorage.setItem('categoryid', params["categoryId"]);
      localStorage.setItem('categoryname', params["categoryName"]);
      this.shopId = params["shopId"];
      this.categoryId = params["categoryId"];
      this.categoryName = params["categoryName"];
      this.getStoreInfo();
    });
    this.refreshCart();
  }

  getStoreInfo() {
    this.storeService.getStoreInfo(this.shopId).then((data) => {
      data.subscribe((data) => {
        this.storeInfo = data;
        this.excludedproducts = data["excludedproducts"] || [];
        this.categorySettings = data["categorysettings"] || [];
        this.priceChangePercent = data["pricechangepercent"];
        this.productService
          .getProductsByCategory(this.categoryId)
          .subscribe((productData) => {
            if (productData !== undefined) {
              this.productList = productData.filter(
                (x) => this.excludedproducts.indexOf(x.id) === -1
              );
              let tempIndex = -1;
              for (let item of this.productList) {
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
      });
    });
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
