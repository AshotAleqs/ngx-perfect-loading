# ngx-perfect-loading

The loading system for Angular 13+ projects.

## Referances
1. [Installation](#installation)
2. [Getting started](#getting-started)
3. [Library API](#library-api)
4. [Demo](#demo)

## Installation
---
You can Install `ngx-perfect-loading` via NPM, using the command below. 
PLEASE NOTE: the Library was created for Angular 13 and high versions

### NPM
```shell
npm install --save ngx-perfect-loading
```

## Getting started
---
Import the `NgxPLoadingModule` in your root application module by `.forRoot()` static method:

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxPLoadingModule } from "ngx-perfect-loading";

@NgModule({
  //...
  imports: [
    //...
    NgxPLoadingModule.forRoot(),
  ],
  //...
})
export class AppModule {}
```

After importing the `NgxPLoadingModule` in your root module, you can use the loading logic in the whole application:

After importing the module, you need to register listener for the `GLOBAL` Loading, by this code in your `AppComponent`:

```typescript
import { Component, OnInit } from '@angular/core';
import { NgxPLoadingService } from 'ngx-perfect-loading';
// .................
@Component({
    //......
})
export class AppComponent {
    loading$!: Observable<boolean>;

    constructor(private _ngxPLoadingService: NgxPLoadingService) {
        this.loading$ = this._ngxPLoadingService.listen();
    }

  
    onClick() {
        // the function to turn on the loading
        this._ngxPLoadingService.on(); 
        setTimeout(() => {
            // the fucntion to turn off the loading
            this._ngxPLoadingService.off(); 
        }, 500);
    }
}
```


**In AppComponent Template**
```
<button (click)="onClick()">Click</button>
<div *ngIf="loading$ | async">
   you can have anything you need, gif, spinner, other loading indicator
</div>
```

Ok, So now we have a loading indicator that can be configured by HTML/CSS to show as you want.

## Library API
---

### Enums
***
`NgxPLoadingType`: **The type of Loading Items(`LOCAL` or `GLOBAL`)** 
```typescript
export enum NgxPLoadingType {
  GLOBAL = 'global',
  LOCAL = 'local'
}
```

### Decorators
***
| `@NgxPListener()` | The Property decorator for loading listener by `option`     |      |      |
|-------------------|------------------------------|------------------------------|-------------|
| **Parameters**    | **Type**                     | **Default**                  |             |
| **`option`**      | **`NgxPLoadingType | string`**| **`NgxPLoadingType.GLOBAL`**| **Optional**| 
**Usage Example**
```
import { Component, OnInit } from '@angular/core';
import { NgxPLoadingService, NgxPListener } from 'ngx-perfect-loading';
// .................
@Component({
    //......
})
export class AppComponent {
    // loading$!: Observable<boolean>;
    
    // listen by decorator 
    @NgxPListener() loading$!: Observable<boolean>;
    

    constructor(private _ngxPLoadingService: NgxPLoadingService) {
        // now this line is not needed as we are doing the same by NgxPListener decorator
        // this.loading$ = this._ngxPLoadingService.listen();
    }

  
    onClick() {
        // the function to turn on the loading
        this._ngxPLoadingService.on(); 
        setTimeout(() => {
            // the fucntion to turn off the loading
            this._ngxPLoadingService.off(); 
        }, 500);
    }
}
```

**In AppComponent Template**
```
<button (click)="onClick()">Click</button>
<div *ngIf="loading$ | async">
   you can have anything you need, gif, spinner, other loading indicator
</div>
```

| `@NgxPLoading()`  | The Method Decorator allows to add loading to the methods. The function is turning `on` the loading by type `loading` and turning it `off` when function execution ends. Also can work with `Promises` and `Observables` |                      |                        |
|-------------------|-------------------------------------------|-------------|-----------------|
| **Parameters**    | **Type**              | **Default** |                                     |
| **`loading`**     | **`NgxPLoadingType`** | **`NgxPLoadingType.GLOBAL`** | **Optional**       |
| **`option`**      | **`{name: string }`** | **Undefiened**               | **Required when `loading` is `NgxPLoadingType.LOCAL`**                                                          |

**Usage Example** 
```
import { Component, OnInit } from '@angular/core';
import { NgxPListener, NgxPLoading } from 'ngx-perfect-loading';
// .................
@Component({
    //......
})
export class AppComponent {
    // listen by decorator 
    @NgxPListener() loading$!: Observable<boolean>;

    constructor() { }
    
    // NgxPLoading Decorator is working with Promises and Observables
    // NOTE: For Observables NgxPLoading Decorator is turning off the loading when the Observable closes 
    @NgxPLoading()
    onClick() {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                
                resolve();
            }, 1000)
        });
    }
}
```

**In AppComponent Template**
```
<button (click)="onClick()">Click</button>
<div *ngIf="loading$ | async">
   you can have anything you need, gif, spinner, other loading indicator
</div>
```

### NgxPLoadingService Methods
***
|`on()`     | turn `on` the loading by type `loading` and with `name` name |         |          |
|-----------|------------------------------------------------------------|---------|------------|
| **Parameters**    | **Type**              | **Default**                  |                    |
| **`loading`**     | **`NgxPLoadingType`** | **`NgxPLoadingType.GLOBAL`** | **Optional**       |
| **`name`**        | **`string`**          | **`NgxPLoadingType.GLOBAL`** |**Required when `loading` is `NgxPLoadingType.LOCAL`**                                                          |
***
|`off()`  | turn `off` the loading by `option` where option can be the name or the type(`GLOBAL` or `LOCAL` ) of loading |              |                                                        |
|-----------|--------------------------|------------------------------------------|-------------|
| **Parameters**  | **Type**           | **Default**                              |             |
| **`option`**    | **`NgxPLoadingType | string`** | **`NgxPLoadingType.GLOBAL`** | **Optional**|
***
|`listen()`        | Method to listen loading changes(on/off) by `option`         |      |      |
|-----------|--------------------------|------------------------------------------|-------------|
| **Parameters**  | **Type**           | **Default**                              |             |
| **`option`**    | **`NgxPLoadingType \| string`** | **`NgxPLoadingType.GLOBAL`** | **Optional**|
***

## Demo
---
Check out the interactive demo on [StackBlitz](https://stackblitz.com/edit/ngx-perfect-loading-demo?file=src/app/app.component.scss).