import { Observable, share } from 'rxjs';
import { NgxPLoadingType } from '../enums/ngx-p-loading-type.enum';
import { NgxPLoadingService } from '../services/ngx-p-loading/ngx-perfect-loading.service';

/**
 * The Property decorator for loading listener by `option`
 *
 * @param option is the type or the name of the loading
 *
 * @return `void`
 */
export function NgxPListener(option: NgxPLoadingType | string = NgxPLoadingType.GLOBAL) {
  return (target: {} | any, name: PropertyKey) => {

    const descriptor = {
      get(this: any) {
        const propertyName = `__${String(name)}`;
        if (!this[propertyName]) {
          if (!NgxPLoadingService.instance) {
            throw 'Please inject NgxPLoadingService service in your Root Module (AppModule)'
          }
          const listener$ = NgxPLoadingService.instance.listen(option);
          this[propertyName] = listener$.pipe(share());
        }

        return this[propertyName];
      },
      enumerable: true,
      configurable: true,
    };

    Object.defineProperty<Observable<boolean>>(target, name, descriptor);
  };
}