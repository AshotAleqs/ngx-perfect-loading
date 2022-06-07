import { finalize, Observable } from 'rxjs';
import { NgxPLoadingType } from '../enums/ngx-p-loading-type.enum';
import { NgxPLoadingService } from '../services/ngx-p-loading/ngx-perfect-loading.service';

type DecoratorFunction = (
  target: Object,
  _1: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor;

/**
 * The Method decorator for adding loading to the function.
 * the decorator is turning on the loading by type `loading` 
 * and turning it off when function execution ends
 *
 * @param loading is the type or the name of the loading
 *
 * @return `void`
 */
export function NgxPLoading(
  loading: NgxPLoadingType | string = NgxPLoadingType.GLOBAL
): DecoratorFunction {

  return (
    _: Object,
    _1: string,
    descriptor: PropertyDescriptor
  ) => {

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!NgxPLoadingService.instance) {
        throw 'Please inject NgxPLoadingService service in your Root Module (AppModule)'
      }

      let name = NgxPLoadingService.instance.on(loading);

      const result = originalMethod.apply(this, args);

      if (result instanceof Promise) {
        return result.finally(() => NgxPLoadingService.instance.off(name));
      } else if (result instanceof Observable) {

        return result.pipe(finalize(() => NgxPLoadingService.instance.off(name)));
      }

      NgxPLoadingService.instance.off(name);
      return result;
    };

    return descriptor;
  }
}