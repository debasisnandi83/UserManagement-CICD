import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '../models/appconfig.model';

@Injectable()
export class AppConfig {
    static settings: IAppConfig;
    constructor(private http: HttpClient) {}
    load() {
        const jsonFile = '/src/assets/config/appconfig.json';
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response : IAppConfig) => {
               AppConfig.settings = <IAppConfig>response;
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}