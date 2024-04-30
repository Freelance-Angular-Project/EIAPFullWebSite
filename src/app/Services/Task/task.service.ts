import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../Models/Tasks/task';
import { TaskDetails } from '../../Models/Tasks/task-details';
import { environment } from '../../../environments/environment.development';
import { TasksToDashboard } from '../../Models/Tasks/tasks-to-dashboard';
import { AddTaskDashboard } from '../../Models/Tasks/add-task-dashboard';
import { EditTask } from '../../Models/Tasks/edit-task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = `${environment.baseApiURL}/Task`; // Replace with your actual base URL
  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  // GET /api/Task/{id}
  getTaskById(id: string): Observable<TaskDetails> {
    return this.http.get<TaskDetails>(`${this.baseUrl}/${id}`);
  }

  // GET /api/Task/GetByProjectId
  getTasksByProjectId(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/GetByProjectId`, {
      params: { projectId },
    });
  }

  // GET /api/Task/GetAll
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/GetAll`);
  }
  //
  getTasksToDashboard(): Observable<TasksToDashboard[]> {
    return this.http.get<TasksToDashboard[]>(
      `${this.baseUrl}/GetAllToDashboard`
    );
  }

  // POST /api/Task/AddTaskNotes
  // Assuming AddTaskNotes takes a Task object with additional note property
  addTaskNotes(taskId: string, notes: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddTaskNotes`, { taskId, notes });
  }
 addTaskNoteInDashboard(taskId: string, notesDetails: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/AddTaskNotes?id=${taskId}`, notesDetails);
}
  // POST /api/Task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }
  // delete => task
  AddTaskToDashboard(task: AddTaskDashboard): Observable<AddTaskDashboard> {
    return this.http.post<AddTaskDashboard>(this.baseUrl, task);
  }
  updateTask(taskid: string, task: EditTask): Observable<EditTask> {
    return this.http.put<EditTask>(`${this.baseUrl}/${taskid}`, task,this.httpOptions);
  }
  deleteTask(taskID: string): Observable<TasksToDashboard> {
    return this.http.delete<TasksToDashboard>(`${this.baseUrl}?id=${taskID}`);
  }
}
