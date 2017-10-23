import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'app', component: AppComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: '**', redirectTo: 'login', pathMatch: 'full'}
    ]),
    UsersModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
