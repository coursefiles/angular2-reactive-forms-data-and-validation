import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SandoAppComponent } from './sando-app.component';
import { OrderSheetComponent } from './counter/order-sheet/order-sheet.component';
import { DebugPanelComponent } from './counter/debug-panel/debug-panel.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    SandoAppComponent,
    OrderSheetComponent,
    DebugPanelComponent
  ],
  bootstrap: [
    SandoAppComponent
  ]
})
export class AppModule { }
