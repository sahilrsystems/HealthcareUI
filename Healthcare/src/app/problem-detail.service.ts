import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProblemDetailService {
  private baseUrl = 'https://localhost:7138/api/';
  constructor(private http: HttpClient) { }

  saveData(dto: any) {
    return this.http.post<any[]>(this.baseUrl +'Detail/Update',dto);
    
  }
}
