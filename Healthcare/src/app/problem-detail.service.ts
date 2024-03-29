import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProblemDetailService {
  private baseUrl = 'http://localhost:5088/api/';
  constructor(private http: HttpClient) { }

  saveData(dto: any): Observable<any> {
    console.log(dto);
    return this.http.post<any>(this.baseUrl+'PatientEncounterDetail/SaveOriginalJson',dto);
  }

  updateData(dto: any): Observable<any> {
    console.log(dto);
    return this.http.put<any>(this.baseUrl+'PatientEncounterDetail/Update',dto);
  }
}
