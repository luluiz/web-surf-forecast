import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { IFilters } from '../models/filter.model';

@Injectable({
    providedIn: 'root'
})
export class ForecastService {

    constructor(
        private http: HttpClient,
    ) { }

    get(spot_name: string): Observable<any> {
        return this.http.get(`${environment.api_forecast}/forecast/${spot_name}`);
    }

    getPastForecast(filters: IFilters): Observable<any> {
        let params: any = {};
        if (filters._id) params._id = filters._id;
        if (filters.spot_name) params.spot_name = filters.spot_name;
        if (filters.date) params.date = filters.date;
        if (filters.date_from && filters.date_to) {
            params.date_from = filters.date_from;
            params.date_to = filters.date_to;
        }

        return this.http.get(`${environment.api_forecast}/forecast_past/`, { params: params });
    }
}
