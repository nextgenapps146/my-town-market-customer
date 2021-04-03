import { Component, OnInit, Inject } from "@angular/core";

import {
  Platform,
  NavController,
  ModalController,
  MenuController,
  AlertController,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { TranslateService } from "@ngx-translate/core";
import { MyEvent } from "src/services/myevent.services";
import { Constants } from "src/models/contants.models";
import { APP_CONFIG, AppConfig } from "./app.config";
import { SignInPage } from "./sign-in/sign-in.page";
import { AuthService } from "src/services/auth.service";
import { Router } from "@angular/router";
// import { FirebaseX } from "@ionic-native/firebase-x/ngx";
// import { FCMService } from "src/services/fcm.service";

import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],

})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  name = "";
  phone = "";
  rtlSide = "left";
  public selectedIndex = 0;
  public appPages = [
    {
      title: "home",
      url: "/home",
      icon: "zmdi zmdi-home",
    },
    {
      title: "shop",
      url: "/shop",
      icon: "zmdi zmdi-home",
    },
    {
      title: "my_profile",
      url: "/my-profile",
      icon: "zmdi zmdi-assignment-account",
    },
    {
      title: "my_orders",
      url: "/my-orders",
      icon: "zmdi zmdi-shopping-cart",
    },
    {
      title: "offers",
      url: "/offers",
      icon: "zmdi zmdi-label",
    },
    {
      title: "faq",
      url: "/faq",
      icon: "zmdi zmdi-alert-circle",
    },
    {
      title: "my_wishlist",
      url: "/wishlist",
      icon: "zmdi zmdi-favorite",
    },

    {
      title: "about_us",
      url: "/about-us",
      icon: "zmdi zmdi-assignment",
    },

    {
      title: "help_center",
      url: "/contact-us",
      icon: "zmdi zmdi-comment-text",
    },
    {
      title: "languges",
      url: "/language",
      icon: "zmdi zmdi-globe",
    },
  ];

  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    private platform: Platform,
    private navCtrl: NavController,
    private splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private statusBar: StatusBar,
    private modalController: ModalController,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private myEvent: MyEvent,
   
    ) {
    this.initializeApp();
    this.myEvent.getLanguageObservable().subscribe((value) => {
      this.navCtrl.navigateRoot(["./"]);
      this.globalize(value);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      FCM.onNotification().subscribe((data) => {
        console.log(data);
        if (data.wasTapped) {
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        }
      });

      // refresh the FCM token
      FCM.onTokenRefresh().subscribe((token) => {
        console.log(token);
      });

      const defaultLang = window.localStorage.getItem(
        Constants.KEY_DEFAULT_LANGUAGE
      );
      this.globalize(defaultLang);
    });
  }

  globalize(languagePriority) {
    this.translate.setDefaultLang("en");
    const defaultLangCode = this.config.availableLanguages[0].code;
    this.translate.use(
      languagePriority && languagePriority.length
        ? languagePriority
        : defaultLangCode
    );
    this.setDirectionAccordingly(
      languagePriority && languagePriority.length
        ? languagePriority
        : defaultLangCode
    );
  }

  setDirectionAccordingly(lang: string) {
    switch (lang) {
      case "ar": {
        this.rtlSide = "rtl";
        break;
      }
      default: {
        this.rtlSide = "ltr";
        break;
      }
    }
  }


  ngOnInit() {
    this.getLocalInfo();
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
    //firebasex
    // this.firebaseX.getToken()
    // .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
    // .catch(error => console.error('Error getting token', error));

  // this.firebaseX.onMessageReceived()
  //   .subscribe(data => console.log(`User opened a notification ${data}`));
  
  // this.firebaseX.onTokenRefresh()
  //   .subscribe((token: string) => console.log(`Got a new token ${token}`));
  }

  getLocalInfo() {
    this.isLoggedIn = this.authService.checkLogin();
    if (this.isLoggedIn) {
      this.name = localStorage.getItem("name");
      this.phone = localStorage.getItem("phonenumber");
    }
  }

  // buyAppAction() {
  //     window.open('http://bit.ly/cc2_GroShop', '_system', 'location=no');
  // }

  login() {
    this.router.navigate(["./sign-in"]);
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
  }

  onActivate() {
    this.getLocalInfo();
  }

  async openLoginModal() {
    this.menuCtrl.toggle();
    const modal = await this.modalController.create({
      component: SignInPage,
    });
    modal.onDidDismiss().then((res) => {
      if (res) {
        if (res.data === "signin") {
          // this.signup(eventObject);
        } else if (res.data === "loggedin" || res.data === "signedin") {
          // this.checkPromtLogin(eventObject);
        }
      }
    });
    return await modal.present();
  }
  
}
