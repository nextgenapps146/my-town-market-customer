import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TitlePageModule } from './title/title.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_CONFIG, BaseAppConfig } from './app.config';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { FirebaseAuthentication } from "@ionic-native/firebase-authentication/ngx";
import { ComponentsModule } from './components/components.module';

import { WebIntent } from '@ionic-native/web-intent/ngx';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        TranslateModule,
        TitlePageModule,
        ComponentsModule,
        // LoginPageModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        FirebaseX,
        FirebaseAuthentication,
        { provide: APP_CONFIG, useValue: BaseAppConfig },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        WebIntent
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
