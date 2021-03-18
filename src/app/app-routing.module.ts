import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/services/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "location",
    loadChildren: () =>
      import("./location/location.module").then((m) => m.LocationPageModule),
  },
  {
    path: "folder/:id",
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "sign-in",
    loadChildren: () =>
      import("./sign-in/sign-in.module").then((m) => m.SignInPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "sign-up",
    loadChildren: () =>
      import("./sign-up/sign-up.module").then((m) => m.SignUpPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "verification",
    loadChildren: () =>
      import("./verification/verification.module").then(
        (m) => m.VerificationPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "shop",
    loadChildren: () =>
      import("./shop/shop.module").then((m) => m.ShopPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "products",
    loadChildren: () =>
      import("./product-list/product-list.module").then(
        (m) => m.ProductListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "search-store",
    loadChildren: () =>
      import("./search-store/search-store.module").then(
        (m) => m.SearchStorePageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "search-product",
    loadChildren: () =>
      import("./search-product/search-product.module").then(
        (m) => m.SearchProductPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "search-store-result",
    loadChildren: () =>
      import("./search-store-result/search-store-result.module").then(
        (m) => m.SearchStoreResultPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "search-product-result",
    loadChildren: () =>
      import("./search-product-result/search-product-result.module").then(
        (m) => m.SearchProductResultPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "item",
    loadChildren: () =>
      import("./item/item.module").then((m) => m.ItemPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "item-detail",
    loadChildren: () =>
      import("./item-detail/item-detail.module").then(
        (m) => m.ItemDetailPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "reviews",
    loadChildren: () =>
      import("./reviews/reviews.module").then((m) => m.ReviewsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "seller-info",
    loadChildren: () =>
      import("./seller-info/seller-info.module").then(
        (m) => m.SellerInfoPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "cart",
    loadChildren: () =>
      import("./cart/cart.module").then((m) => m.CartPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "select-address",
    loadChildren: () =>
      import("./select-address/select-address.module").then(
        (m) => m.SelectAddressPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "payment-mode",
    loadChildren: () =>
      import("./payment-mode/payment-mode.module").then(
        (m) => m.PaymentModePageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "order-confirm",
    loadChildren: () =>
      import("./order-confirm/order-confirm.module").then(
        (m) => m.OrderConfirmPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "my-profile",
    loadChildren: () =>
      import("./my-profile/my-profile.module").then(
        (m) => m.MyProfilePageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "offers",
    loadChildren: () =>
      import("./offers/offers.module").then((m) => m.OffersPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "add-address",
    loadChildren: () =>
      import("./add-address/add-address.module").then(
        (m) => m.AddAddressPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "title",
    loadChildren: () =>
      import("./title/title.module").then((m) => m.TitlePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "my-orders",
    loadChildren: () =>
      import("./my-orders/my-orders.module").then((m) => m.MyOrdersPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "add-review",
    loadChildren: () =>
      import("./add-review/add-review.module").then(
        (m) => m.AddReviewPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "wishlist",
    loadChildren: () =>
      import("./wishlist/wishlist.module").then((m) => m.WishlistPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "about-us",
    loadChildren: () =>
      import("./about-us/about-us.module").then((m) => m.AboutUsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "contact-us",
    loadChildren: () =>
      import("./contact-us/contact-us.module").then(
        (m) => m.ContactUsPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "language",
    loadChildren: () =>
      import("./language/language.module").then((m) => m.LanguagePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "filter",
    loadChildren: () =>
      import("./filter/filter.module").then((m) => m.FilterPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("./notifications/notifications.module").then(
        (m) => m.NotificationsPageModule
      ),
  },  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
