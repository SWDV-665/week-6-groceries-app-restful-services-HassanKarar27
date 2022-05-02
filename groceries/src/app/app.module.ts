import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GroceriesServiceService} from './services/groceries-service.service';
import {InputDialogServiceService} from './services/input-dialog-service.service';
import {File} from '@ionic-native/file/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {HttpClientModule} from "@angular/common/http";

// @ts-ignore
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SocialSharing, InputDialogServiceService, GroceriesServiceService,File]
  ,bootstrap: [AppComponent]
})
export class AppModule {}
