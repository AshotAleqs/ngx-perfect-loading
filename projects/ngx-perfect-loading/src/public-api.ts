/*
 * Public API Surface of ngx-perfect-loading
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPLoadingModuleConfig } from './lib/models/ngx-p-loading-module-config';
import { NgxPLoadingService } from './lib/services/ngx-p-loading/ngx-perfect-loading.service';

export * from './lib/decorators/ngx-p-listener.decorator';
export * from './lib/decorators/ngx-p-loading.decorator';
export * from './lib/enums/ngx-p-loading-type.enum';
export * from './lib/models/ngx-p-loading-item';
export * from './lib/services/ngx-p-loading/ngx-perfect-loading.service';


@NgModule()
export class NgxPLoadingModule {
  /**
   * Use this method in your root module 
   * to initialize `NgxPLoadingModule` module with `NgxPLoadingService` provider
   */
  static forRoot(config: NgxPLoadingModuleConfig = {}): ModuleWithProviders<NgxPLoadingModule> {
    return {
      ngModule: NgxPLoadingModule,
      providers: [NgxPLoadingService]
    };
  }

}