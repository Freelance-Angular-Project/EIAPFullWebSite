import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../Models/Projects/project';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ProjectDashboard } from '../../Models/Projects/project-dashboard';
import { CreateProject } from '../../Models/Projects/create-project';
import { EditProject } from '../../Models/Projects/edit-project';
import { ProjectInSchool } from '../../Models/Projects/project-in-school';
import { AddSchoolToProject } from '../../Models/Projects/add-school-to-project';
import { ProjectDetailsAll } from '../../Models/Projects/project-details-all';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = `${environment.baseApiURL}/Projects`; // Replace with the actual base URL
  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Accept': 'application/json'

    })
  };
  constructor(private http: HttpClient) { }
  createProject(newsItem: FormData): Observable<any> {
    return this.http.post(this.baseUrl, newsItem,this.httpOptions);
  }
  addSchoolToProject(school:AddSchoolToProject):Observable<AddSchoolToProject>{
    return this.http.post<AddSchoolToProject>(`${this.baseUrl}/AddSchoolsToProject`, school,this.httpOptions);

  }
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
    return this.http.delete<ProjectDashboard>(`${this.baseUrl}?id=${id}`);
  }

  editProject(projectID: string, project: EditProject): Observable<string> {
    const formData = new FormData();

    // Add project fields to formData
    Object.keys(project).forEach(key => {
      if (project[key] instanceof File) {
        formData.append(key, project[key], (project[key] as File).name);
      } else {
        formData.append(key, project[key]);
      }
    });

    // Set headers for multipart/form-data and Accept as text/plain
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/plain'
      }),
      responseType: 'text' as 'json'
    };

    return this.http.put<string>(`${this.baseUrl}/${projectID}`, formData, httpOptions);
  }
  GetByIdToDashboard(id:string): Observable<ProjectDetailsAll>
  {
    return this.http.get<ProjectDetailsAll>(`${this.baseUrl}/GetByIdToDashboard${id}`);
  }
  updateProjectImage(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.put(
      `${this.baseUrl}/UpdateImage/${id}`,
      formData,
      this.httpOptions
    );
  }

}
