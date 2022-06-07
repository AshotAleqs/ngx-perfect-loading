import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NgxPLoadingType } from '../../enums/ngx-p-loading-type.enum';
import { NgxPLoadingItem } from '../../models/ngx-p-loading-item';

@Injectable()
export class NgxPLoadingService {

  static instance: NgxPLoadingService;

  private _loadingItems: NgxPLoadingItem[] = [];
  // set the private property (_loadingItems) value
  // and emit event for the listeners
  private set loadingItems(loadingItems: NgxPLoadingItem[]) {
    this._loadingItems = loadingItems || [];
    this._loadingChange.next(this._loadingItems);
  }
  // get the private property (_loadingItems) value
  private get loadingItemsList() { return this._loadingItems; }

  private _loadingChange: BehaviorSubject<NgxPLoadingItem[]>
    = new BehaviorSubject(this.loadingItemsList);

  constructor() { NgxPLoadingService.instance = this; }

  /**
   * turn `on` the loading by `loading` 
   * where `loading` can be the name or the type(`GLOBAL` or `LOCAL` ) of loading
   *
   * @param loading - is the type or the name of the loading item
   *
   * @return the unique name of the loading item, 
   * where the loading name can be provided by user by `loading` paramenter
   */
  on(loading: NgxPLoadingType | string = NgxPLoadingType.GLOBAL): string {

    const uuid = new Date().getTime();
    // get unique id for the notifier
    let loadingName = `loading-${uuid}`;

    if (!loading || loading === NgxPLoadingType.GLOBAL) {
      loading = NgxPLoadingType.GLOBAL;

    } else {
      // check at first the loading, it can be provided as a name
      loadingName = loading === NgxPLoadingType.LOCAL ? loadingName : loading;
      loading = NgxPLoadingType.LOCAL;
    }


    const ngxPerfectLoadingItem: NgxPLoadingItem = {
      loading: loading as NgxPLoadingType,
      name: loadingName
    };

    this.loadingItems = [ngxPerfectLoadingItem, ...this.loadingItemsList];

    return loadingName;
  }

  /**
   * turn `off` the loading by `loading` 
   * where `loading` can be the name or the type(`GLOBAL` or `LOCAL` ) of loading
   *
   * @param loading is the type or the name of the loading item
   * by default is the type - `NgxPLoadingType.GLOBAL`
   *
   * @return `true` when it found the item by `loading` name or type
   */
  off(loading: NgxPLoadingType | string = NgxPLoadingType.GLOBAL) {
    const length = this.loadingItems?.length;

    this.loadingItems = this.loadingItemsList
      .filter(item => !(item.name === loading || item.loading === loading));

    return length !== this.loadingItems?.length;
  }

  /**
   * listen the loading changes by `loading` 
   * where `loading` can be the name or the type(`GLOBAL` or `LOCAL` ) of loading
   *
   * @param loading - is the type or the name of the loading item
   *
   * @return listener for `loading`, 
   * where `loading` can be the name or the type(`GLOBAL` or `LOCAL` ) of loading
   */
  listen(loading: NgxPLoadingType | string = NgxPLoadingType.GLOBAL) {
    return this._loadingChange
      .asObservable()
      .pipe(
        debounceTime(10),
        map(items => items?.filter(i => i.loading === loading || i.name === loading)),
        map(items => !!items?.length),
        distinctUntilChanged()
      );
  }

}

