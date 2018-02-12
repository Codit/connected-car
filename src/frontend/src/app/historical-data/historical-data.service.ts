import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HistoricalDataService {
    constructor(private http: HttpClient) {}

    getHourlylData(interval: string) {
        return this.http.get(`${environment.apiUri}historicaldata/${interval}`);
    }
}
