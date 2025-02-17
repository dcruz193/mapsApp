import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";

@Injectable({
    providedIn: 'root',
})
export class PlacesApiClient extends HttpClient {
    baseUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

    constructor( handler: HttpHandler){
        super(handler);
    }

    override get<T>(url: string, options: {
        params?: HttpParams | {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
        };
    }){
        url = this.baseUrl + url;
        return super.get<T>(url, {
            params: {
                limit: 5,
                language: 'es',
                access_token: environment.apiKey,
                ...options.params
            }
        });
    }
}