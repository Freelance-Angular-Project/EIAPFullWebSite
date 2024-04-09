import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../Models/project';
import { Observable } from 'rxjs';
import { ProjectImageUpdate } from '../../Models/project-image-update';
import { SchoolToProject } from '../../Models/school-to-project';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = `${environment.baseApiURL}/Projects`; // Replace with the actual base URL

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/GetAll`);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  // createProject(project: Project): Observable<Project> {
  //   return this.http.post<Project>(this.baseUrl, project);
  // }

  // updateProject(id: number, project: Project): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${id}`, project);
  // }

  // deleteProject(id: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/${id}`);
  // }

  // updateProjectImage(id: number, imageUpdate: ProjectImageUpdate): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('image', imageUpdate.image);

  //   return this.http.put(`${this.baseUrl}/UpdateImage/${id}`, formData);
  // }

  // addSchoolsToProject(schoolToProject: SchoolToProject): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/AddSchoolsToProject`, schoolToProject);
  // }
}
