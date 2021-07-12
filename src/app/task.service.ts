import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Task } from './task.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
   apiUrl  = "https://port-fixed.herokuapp.com";
  //apiUrl  = "http://localhost:3000";
  constructor(private http:HttpClient) { }

  addTask(task:Task){
    return this.http.post(this.apiUrl + '/addtask', task);
  }
  getTasks(){
    return this.http.get(this.apiUrl + '/tasks');
  }
  getTask(id:Number){
    return this.http.get(this.apiUrl + '/gettask/' +id);
  }
  editTask(task:Task,id:any){
    return this.http.put(this.apiUrl + '/edittask/' + id, task);
  }
  deleteTask(id:any){
    return this.http.delete(this.apiUrl + '/tasks/' + id);
  }
}
