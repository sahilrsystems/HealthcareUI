import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  actionUrl: string = 'http://localhost:5088/api/';
  mlActionUrl: string = 'http://10.131.85.58:5053/';
  constructor(private http: HttpClient) {

  }
  public getAll<T>(apiUrl: string): Observable<T> {
    return this.http.get<T>(this.actionUrl + apiUrl);
  }

  public post<T>(apiUrl: string, data: T): Observable<T> {
    return this.http.post<T>(this.actionUrl + apiUrl, data);
  }
  public postML<T>(apiUrl: string, data: T): Observable<T> {
    return this.http.post<T>(this.mlActionUrl + apiUrl, data);
  }
}
