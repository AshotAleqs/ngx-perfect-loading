import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPListener, NgxPLoading, NgxPLoadingModule } from 'ngx-perfect-loading';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxPLoadingModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // listen by decorator
  @NgxPListener() loading$!: Observable<boolean>;
  @NgxPListener('SimpleButton') localListener$!: Observable<boolean>;

  // NgxPLoading Decorator is working with Promises and Observables
  // NOTE: For Observables NgxPLoading Decorator is turning off the loading when the Observable closes
  @NgxPLoading()
  onClick() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 3000);
    });
  }

  @NgxPLoading('SimpleButton')
  onTurnOnLocalLoading() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 3000);
    });
  }
}
