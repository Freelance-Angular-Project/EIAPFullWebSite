import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../Models/Projects/project';
import { Observable } from 'rxjs';
import { ProjectImageUpdate } from '../../Models/Projects/project-image-update';
import { SchoolToProject } from '../../Models/Schools/school-to-project';
import { environment } from '../../../environments/environment.development';
import { ProjectDashboard } from '../../Models/Projects/project-dashboard';

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

  getAllProjectsToDashboard(): Observable<ProjectDashboard[]> {
    return this.http.get<ProjectDashboard[]>(`${this.baseUrl}/GetAllProjectsToDashboard`);
  }
  deleteProject(id: string): Observable<ProjectDashboard> {
    return this.http.delete<ProjectDashboard>(`${this.baseUrl}/${id}`);
  }
}
