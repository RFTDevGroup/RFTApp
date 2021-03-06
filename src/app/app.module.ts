import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { TransportModule } from './transport/transport.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AuctionModule } from './auction/auction.module';
import { MessageModule } from './message/message.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LocalStorageModule.withConfig({
      prefix: 'app-root',
      storageType: 'localStorage'
    }),
    UsersModule,
    TransportModule,
    AuctionModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'app', component: AppComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: '**', redirectTo: 'login', pathMatch: 'full'}
    ]),
    FormsModule,
    HttpModule,
    MessageModule,
    Angular2FontawesomeModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
