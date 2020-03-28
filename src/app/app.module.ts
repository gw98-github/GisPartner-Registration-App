import { PersonFirebaseService } from './services/person-firebase.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireModule} from "@angular/fire";
import { RegisteredUsersListComponent } from './registered-users-list/registered-users-list.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    RegisteredUsersListComponent,
    MenuComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: MenuComponent},
      {path: 'registered-users-list', component: RegisteredUsersListComponent},
      {path: 'registration', component: RegisterComponent}
    ]),
  ],
  providers: [PersonFirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
