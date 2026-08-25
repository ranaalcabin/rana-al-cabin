import { NgModule } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { App } from './app';
import { ServerModule } from '@angular/platform-server';
import { serverRoutes } from './app.routes.server';
import { AppModule } from './app-module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateServerLoader } from './translate.loader.server';

@NgModule({
  imports: [AppModule,ServerModule,TranslateModule.forRoot({loader:{
    provide:TranslateLoader,
    useClass:TranslateServerLoader
  }})],
  providers: [provideServerRendering(withRoutes(serverRoutes))],
  bootstrap: [App],
})
export class AppServerModule {}
