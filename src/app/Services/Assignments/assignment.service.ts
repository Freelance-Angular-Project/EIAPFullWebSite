import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAssignment } from '../../Models/Assignments/get-assignment';
import { EditAssignment } from '../../Models/Assignments/edit-assignment';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private baseUrl = `${environment.baseApiURL}/Assignments`; // Replace with the actual base URL
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/plain',
    }),
  };
  constructor(private httpclient: HttpClient) {}
  getAssignmentByTaskID(taskid: string): Observable<GetAssignment[]> {
    return this.httpclient.get<GetAssignment[]>(
      `${this.baseUrl}/GetTaskResultsToTaskDashboard?taskId=${taskid}`
    );
  }
  editAssignment(assignment:EditAssignment): Observable<EditAssignment>{
    return this.httpclient.put<EditAssignment>(
      `${this.baseUrl}`,assignment,this.httpOptions
    );
  }

}
