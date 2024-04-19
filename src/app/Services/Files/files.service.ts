import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private baseUrl = 'https://mohamedellnagar-001-site1.atempurl.com/api/Files'; // Replace with the actual base URL
  httpOptions = {
   headers: new HttpHeaders({

     'Accept': 'text/plain'

   })
 };
 constructor(private http: HttpClient) {}

 uploadFile(formData: FormData): Observable<any> { // Changed type to FormData
   return this.http.post(this.baseUrl, formData, this.httpOptions);
 }
}
