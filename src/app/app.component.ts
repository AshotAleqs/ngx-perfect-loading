import { Component } from '@angular/core';
import { NgxPListener, NgxPLoading } from 'ngx-perfect-loading';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // listen by decorator
  @NgxPListener() loading$!: Observable<boolean>;
  @NgxPListener('SimpleButton') localListener$!: Observable<boolean>;
  @NgxPListener('SimpleButton2') localListener2$!: Observable<boolean>;

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
      }, 5000);
    });
  }

  @NgxPLoading('SimpleButton2')
  onTurnOnLocalLoading2() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 1000);
    });
  }
}

