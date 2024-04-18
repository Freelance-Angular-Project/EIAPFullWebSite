import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../Models/Tasks/task';
import { TaskDetails } from '../../Models/Tasks/task-details';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = `${environment.baseApiURL}/Task`; // Replace with your actual base URL

  constructor(private http: HttpClient) { }

  // GET /api/Task/{id}
  getTaskById(id: string): Observable<TaskDetails> {
    return this.http.get<TaskDetails>(`${this.baseUrl}/${id}`);
  }






  // GET /api/Task/GetByProjectId
  getTasksByProjectId(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/GetByProjectId`, { params: { projectId } });
  }



  // GET /api/Task/GetAll
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/GetAll`);
  }

  // POST /api/Task/AddTaskNotes
  // Assuming AddTaskNotes takes a Task object with additional note property
  addTaskNotes(taskId: string, notes: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddTaskNotes`, { taskId, notes });
  }

  // POST /api/Task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }
}
