import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app.module.routing';
import { FormComponent } from './pages/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './pages/components/nav-bar/nav-bar.component';
import { ListComponent } from './pages/list/list.component';

@NgModule({

  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    NavBarComponent,
  ],

  imports: [
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule
  ],

  bootstrap: [ AppComponent ]

})
export class AppModule { }
