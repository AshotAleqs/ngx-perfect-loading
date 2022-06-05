import { Component, OnInit } from '@angular/core';
import { NgxPListener, NgxPLoading, NgxPLoadingService } from 'ngx-perfect-loading';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'library';
  @NgxPListener() loading$!: Observable<boolean>;

  constructor(private _ngxPLoadingService: NgxPLoadingService) {
    // this.loading$ = this._ngxPLoadingService.listen();
  }

  ngOnInit(): void {
    console.log(this.loading$);
    // this.loading$.subscribe(res => console.log(res, 'listenre value'))
    setTimeout(() => {
      this.onClick().subscribe(_ => { console.log(_) });
    }, 3000);
  }

  @NgxPLoading()
  onClick() {
    const r = new BehaviorSubject('');

    return r.pipe(debounceTime(400), take(1));
  }
}
