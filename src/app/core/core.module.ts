import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpService } from './services/http.service';
import { HttpInterceptorService } from './services/api-interceptor.service';
import { AuthGuard } from '../core/guards/auth.guard';
import { EnvServiceProvider } from '../core/services/env.service.provider';

@NgModule({
    imports: [
      CommonModule,
      HttpClientModule
    ],
    declarations: [],
    providers: [
      HttpService,
      AuthGuard,
      { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
      EnvServiceProvider
    ],
    exports: []
  })
  export class CoreModule {}
