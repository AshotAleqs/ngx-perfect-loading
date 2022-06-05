import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPLoadingModule } from 'ngx-perfect-loading';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxPLoadingModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
