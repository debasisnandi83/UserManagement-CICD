import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpHeaderResponse, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, Subscriber, throwError, from } from 'rxjs';
import { tap, map, filter, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AppConfig } from '../services/appconfig.service';
//import { ApiConfig } from '../config/api-config';
//import { EnvService } from './env.service';
import { IAppConfig } from '../../core/models/appconfig.model';

@Injectable()
export class HttpService {

    appConfig: IAppConfig;
    //baseApi: any;
    baseApi: any = environment.production ? AppConfig.settings.apiServer.prodUrl : AppConfig.settings.apiServer.devUrl;
    
    constructor(private http: HttpClient) {
    }

    async getAppConfig(): Promise<any> {
        let jsonFile = '/src/assets/config/appconfig.json';
        let appConfig: any = await this.http.get<any>(jsonFile).toPromise();
        return appConfig;
    }

    get(api: any): Observable<any> {
        //let url: string = ApiConfig.baseApi + api;
        let url: string = this.baseApi + api;
        //let url: string = api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.get(url, httpOptions)
            .pipe(catchError(this.handleError));
    }

    post(api: any, model: any): Observable<any> {
        //let url: string = ApiConfig.baseApi + api;
        let url: string = this.baseApi + api;
        //let url: string = api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.post(url, model, httpOptions)
            .pipe(catchError(this.handleError));
    }

    put(api: any, model: any): Observable<any> {
        //let url: string = ApiConfig.baseApi + api;
        let url: string = this.baseApi + api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.put(url, model, httpOptions)
            .pipe(catchError(this.handleError));
    }

    patch(api: any, model: any): Observable<any> {
        //let url: string = ApiConfig.baseApi + api;
        let url: string = this.baseApi + api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.patch(url, model, httpOptions)
            .pipe(catchError(this.handleError));
    }

    postFormData(api: any, formData: FormData): Observable<any> {
        //let url: string = ApiConfig.baseApi + api;
        let url: string = this.baseApi + api;
        let httpOptions = { headers: new HttpHeaders() };
        return this.http.post(url, formData, httpOptions)
            .pipe(catchError(this.handleError));
    }

    getJson(api: any): Observable<any> {
        //let url: string = ApiConfig.baseApi + api;
        let url: string = this.baseApi + api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.get(url, httpOptions)
            .pipe(map(this.extractData), catchError(this.handleError));
    }

    postJson(api: any, model: any): Observable<any> {
        //let url: string = ApiConfig.baseApi + api;
        let url: string = this.baseApi + api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.post(url, model, httpOptions)
            .pipe(map(this.extractData), catchError(this.handleError));
    }

    getConfig(url: string): Observable<any> {
        return this.http.get(url)
            .pipe(catchError(this.handleError));
    }

    getCsv(url): Observable<any> {
        return this.http.get(url, { responseType: 'text' })
            .pipe(catchError(this.handleError));
    }

    async asyncGet(api: string): Promise<any> {
        //let url: any = ApiConfig.baseApi + api;
        let url: any = this.baseApi + api;
        try {
            let response = await this.http.get(url).toPromise();
            return response;
        } catch (error) {
            await this.handleError(error);
        }
    }

    getData(api: any, dataType: string): Observable<any> {
        //let url: any = ApiConfig.baseApi + api;
        let url: any = this.baseApi + api;
        //const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        let headers: any;
        if (dataType.toLowerCase() == 'json')
            headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        else
            headers = new HttpHeaders().set('Content-Type', 'csv/plain; charset=utf-8');

        return this.http.get(url, { headers, responseType: 'text' }).pipe(catchError(this.handleError));
        //return this.http.get(url, { headers }).pipe(catchError(this.handleError));
    }

    private handleHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }

    private handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`; // client-side error
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; // server-side error
        }
        return throwError(errorMessage);
    }
    
    private extractData(response: Response) {
        let body = response.json();
        return body || {};
    }

}

