import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../../Models/Schools/school';
import { Schooltoselect } from '../../Models/Schools/schooltoselect';
import { ProjectInSchool } from '../../Models/Projects/project-in-school';
import { environment } from '../../../environments/environment.development';
import { TaskDetails } from '../../Models/Tasks/task-details';
import { PostSchool } from '../../Models/Schools/post-school';
import { TopSchool } from '../../Models/Schools/top-school';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private baseUrl = `${environment.baseApiURL}/School`; // Replace with your actual base URL
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };
  httpOptionFormData = {
    headers: new HttpHeaders({
      // Accept: 'text/plain',
      enctype: 'multipart/form-data',
    }),
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
  getProjectWithtaskstoschool(projectID: string): Observable<ProjectInSchool> {
    return this.http.get<ProjectInSchool>(
      `${this.baseUrl}/GetProjectWithTasksToSchool?projectId=${projectID}`
    );
  }

  // PUT /api/School/{id}

  updateSchool(school: School): Observable<School> {
    school.userId = '';
    return this.http.put<School>(
      `${this.baseUrl}/${school.id}`,
      school,
      this.httpOptions
    );
  }

  GetTaskDetailsToSchool(taskId: string): Observable<TaskDetails> {
    return this.http.get<TaskDetails>(
      `${this.baseUrl}/GetTaskDetailsToSchool?taskId=${taskId}`
    );
  }

  // POST /api/School
  createSchool(school: PostSchool): Observable<PostSchool> {
    return this.http.post<PostSchool>(this.baseUrl, school, this.httpOptions);
  }

  // DELETE /api/School/{id}
  deleteSchool(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}?id=${id}`);
  }

  AddSchoolFiles(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      `${this.baseUrl}/import-and-register-school-managers`,
      formData,
      this.httpOptionFormData
    );
  }



}
