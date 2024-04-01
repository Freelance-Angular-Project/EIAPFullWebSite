import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../../Models/school';
import { Schooltoselect } from '../../Models/schooltoselect';
import { ProjectInSchool } from '../../Models/project-in-school';
import { environment } from '../../../environments/environment.development';
import { TaskDetails } from '../../Models/task-details';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private baseUrl = `${environment.baseApiURL}/School`; // Replace with your actual base URL
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'

    })
  };
  constructor(private http: HttpClient) {}

  // GET /api/School/GetAll
  getAllSchools(): Observable<School[]> {
    return this.http.get<School[]>(`${this.baseUrl}/GetAll`);
  }

  // GET /api/School/{id}
  getSchoolById(id: string): Observable<School> {
    return this.http.get<School>(`${this.baseUrl}/${id}`);
  }

  // get school by authoriz
  getOneSchool(): Observable<School> {
    return this.http.get<School>(`${this.baseUrl}`);
  }
  isUserAuthorized(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Convert to boolean: true if token exists, false otherwise
  }
  getAllSchoolsToSelect(): Observable<Schooltoselect[]> {
    return this.http.get<Schooltoselect[]>(
      `${this.baseUrl}/GetAllSchoolsToSelect`
    );
  }
  getProjectWithtaskstoschool(projectID:string): Observable<ProjectInSchool>  {
    return this.http.get<ProjectInSchool>(`${this.baseUrl}/GetProjectWithTasksToSchool?projectId=${projectID}`);


  }

  // PUT /api/School/{id}

  updateSchool(school: School): Observable<School> {
    school.userId="";
    return this.http.put<School>(`${this.baseUrl}/${school.id}`, school, this.httpOptions);
  }

  GetTaskDetailsToSchool(taskId:string): Observable<TaskDetails>
  {
    return this.http.get<TaskDetails>(`${this.baseUrl}/GetTaskDetailsToSchool?taskId=${taskId}`);

  }










  // POST /api/School
  createSchool(school: School): Observable<School> {
    return this.http.post<School>(this.baseUrl, school);
  }



  // DELETE /api/School/{id}
  deleteSchool(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
