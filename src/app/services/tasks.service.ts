import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService
{
  constructor(private httpClient: HttpClient)
  {
  }

  insertTask(newTask: Task): Observable<Task>
  {
    return this.httpClient.post<Task>("/api/createtask", newTask, { responseType: "json" });
  }
}


