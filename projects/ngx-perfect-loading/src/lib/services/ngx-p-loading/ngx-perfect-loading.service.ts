import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
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
   * function for turn on the loading by type `loading` and with `name` name
   *
   * @param loading - `NgxPLoadingType.LOCAL` | `NgxPLoadingType.GLOBAL`
   * @param name - `string` required when `loading` is `NgxPLoadingType.LOCAL`
   *
   * @return the unique name of the current turned on loading
   */
  on(loading: NgxPLoadingType.LOCAL, name: string): string
  on(loading?: NgxPLoadingType.GLOBAL, name?: string): string
  on(
    loading: NgxPLoadingType = NgxPLoadingType.GLOBAL,
    name?: string
  ): string {

    const uuid = new Date().getTime()
    // get unique id for the notifier
    const loadingName = name || `loading-${uuid}`;

    const ngxPerfectLoadingItem: NgxPLoadingItem = {
      loading: loading,
      name: loadingName
    };

    this.loadingItems = [ngxPerfectLoadingItem, ...this.loadingItemsList];

    return loadingName;
  }

  /**
   * function for turn off the loading by `option`
   *
   * @param option is the name or
   * type(`NgxPLoadingType.LOCAL` | `NgxPLoadingType.GLOBAL`) of the loading
   * by default is `NgxPLoadingType.GLOBAL`
   *
   * @return `true` when something was turned off, otherwise `false`
   */
  off(option: NgxPLoadingType | string = NgxPLoadingType.GLOBAL) {
    const length = this.loadingItems?.length;

    this.loadingItems = this.loadingItemsList
      .filter(item => item.name !== option && item.loading !== option);

    return length !== this.loadingItems?.length;
  }

  /**
   * function to listen loading turno on/off by `option`
   *
   * @param option is the name or
   * type(`NgxPLoadingType.LOCAL` | `NgxPLoadingType.GLOBAL`)
   * by default is `NgxPLoadingType.GLOBAL`
   *
   * @return Observable that will emit `boolean` value referring to `option`
   */
  listen(option: NgxPLoadingType | string = NgxPLoadingType.GLOBAL) {
    return this._loadingChange
      .asObservable()
      .pipe(
        debounceTime(10),
        filter((items) => (
          !items?.length
          || !!items?.find(i => i.loading === option || i.name === option)
        )),
        map(items => !!items?.length),
        distinctUntilChanged()
      );
  }

}

