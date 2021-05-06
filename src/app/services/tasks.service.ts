import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { GroupedTask } from '../models/grouped-task';

@Injectable({
  providedIn: 'root'
})
export class TasksService
{
  constructor(private httpClient: HttpClient)
  {
  }

  getTasks() : Observable<GroupedTask[]>
  {
    return this.httpClient.get<GroupedTask[]>("/api/tasks", { responseType: "json" });
  }

  insertTask(newTask: Task): Observable<Task>
  {
    return this.httpClient.post<Task>("/api/createtask", newTask, { responseType: "json" });
  }
}



