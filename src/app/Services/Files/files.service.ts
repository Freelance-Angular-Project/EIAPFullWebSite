import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';

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

//  uploadFile(formData: FormData): Observable<any> { // Changed type to FormData
//    return this.http.post(this.baseUrl, formData, this.httpOptions);
//  }
private uploadStatus = new BehaviorSubject<{ [taskId: string]: boolean }>({});
uploadFile(formData: FormData, taskId: string): Observable<any> {
  return this.http.post(`${this.baseUrl}`, formData, this.httpOptions).pipe(
    tap((response) => {
      // Upon successful upload, update the status
      const currentStatus = this.uploadStatus.value;
      currentStatus[taskId] = true;  // true means a file has been uploaded
      this.uploadStatus.next(currentStatus);
    })
  );
}

isUploadDisabled(taskId: string): Observable<boolean> {
  return this.uploadStatus.asObservable().pipe(
    map(statuses => !!statuses[taskId])
  );
}
 deleteFile(fileId: string): Observable<any> {
  const url = `${this.baseUrl}?id=${fileId}`;
  return this.http.delete(url, this.httpOptions);
}
}
