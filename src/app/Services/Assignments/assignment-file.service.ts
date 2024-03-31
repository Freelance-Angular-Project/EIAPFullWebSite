import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AssignmentFileService {


  httpOptions = {
   headers: new HttpHeaders({

     'Accept': 'text/plain'

   })
 };
 constructor(private http: HttpClient) {}

 uploadFile(formData: FormData): Observable<any> { // Changed type to FormData
   return this.http.post(`${environment.baseApiURL}/Assignments`, formData, this.httpOptions);
 }
}
