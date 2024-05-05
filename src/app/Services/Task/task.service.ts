import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../Models/Tasks/task';
import { TaskDetails } from '../../Models/Tasks/task-details';
import { environment } from '../../../environments/environment.development';
import { TasksToDashboard } from '../../Models/Tasks/tasks-to-dashboard';
import { AddTaskDashboard } from '../../Models/Tasks/add-task-dashboard';
import { EditTask } from '../../Models/Tasks/edit-task';
import { TaskNoteDetails } from '../../Models/Tasks/task-note-details';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = `${environment.baseApiURL}/Task`; // Replace with your actual base URL
  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      Accept: 'application/json',
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

  // POST /api/Task/AddTaskNotes
  // Assuming AddTaskNotes takes a Task object with additional note property
  addTaskNotes(taskId: string, notes: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddTaskNotes`, { taskId, notes });
  }

  // POST /api/Task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }
  // delete => task

  updateTask(taskid: string, task: EditTask): Observable<EditTask> {
    return this.http.put<EditTask>(
      `${this.baseUrl}/${taskid}`,
      task,
      this.httpOptions
    );
  }
  deleteTask(taskID: string): Observable<TasksToDashboard> {
    return this.http.delete<TasksToDashboard>(`${this.baseUrl}?id=${taskID}`);
  }
  // #############################################################################
  // dashboard
  getTasksToDashboard(): Observable<TasksToDashboard[]> {
    return this.http.get<TasksToDashboard[]>(
      `${this.baseUrl}/GetAllToDashboard`
    );
  }

  addTaskNoteInDashboard(
    taskId: string,
    notesDetails: TaskNoteDetails[]
  ): Observable<TaskNoteDetails[]> {
    return this.http.post<TaskNoteDetails[]>(
      `${this.baseUrl}/AddTaskNotes?id=${taskId}`,
      notesDetails,this.httpOptions
    );
  }


  AddTaskToDashboard(task: FormData): Observable<AddTaskDashboard> {
    return this.http.post<AddTaskDashboard>(this.baseUrl, task);
  }


  // AddTaskToDashboard(task: AddTaskDashboard): Observable<AddTaskDashboard> {
  //   return this.http.post<AddTaskDashboard>(this.baseUrl, task);


  // }

  getTasksByProjectIdDashboard(projectId: string): Observable<TasksToDashboard[]> {
    const url = `${this.baseUrl}/GetByProjectIdToDashboard?projectId=${projectId}`;
    return this.http.get<TasksToDashboard[]>(url);
  }

  deleteTaskNotes(taskId: string): Observable<any> {
    const url = `${this.baseUrl}/RemoveTaskNotes?id=${taskId}`;
    return this.http.delete(url,this.httpOptions);
  }

}
