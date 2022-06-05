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
 * @param loading is the type of loading: 
 * can be `NgxPLoadingType.GLOBAL` or `NgxPLoadingType.LOCAL`
 * @param options contains the name of loading, not needed for global
 *
 * @return `void`
 */
export function NgxPLoading(loading?: NgxPLoadingType.GLOBAL): DecoratorFunction;
export function NgxPLoading(
  loading: NgxPLoadingType.LOCAL,
  options: { name: string; }
): DecoratorFunction
export function NgxPLoading(
  loading: NgxPLoadingType = NgxPLoadingType.GLOBAL,
  options?: { name: string; }
): DecoratorFunction {

  return (
    target: Object,
    _1: string,
    descriptor: PropertyDescriptor
  ) => {

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!NgxPLoadingService.instance) {
        throw 'Please inject NgxPLoadingService service in your Root Module (AppModule)'
      }
      NgxPLoadingService.instance.on(loading as any, options?.name);

      const result = originalMethod.apply(this, args);

      if (result instanceof Promise) {
        return result.finally(() => NgxPLoadingService.instance.off(options?.name));
      } else if (result instanceof Observable) {

        return result.pipe(finalize(() => NgxPLoadingService.instance.off(options?.name)));
      }

      NgxPLoadingService.instance.off(options?.name);

      return result;

    };

    return descriptor;
  }
}