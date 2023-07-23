import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatButtonModule } from '@angular/material/button'

import { AppComponent } from './app.component';
import { BalanceTableComponent } from './balance-table/balance-table.component';

@NgModule({
  declarations: [
    AppComponent,
    BalanceTableComponent
  ],
  imports: [
    BrowserModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
