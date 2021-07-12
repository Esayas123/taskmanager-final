import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import * as moment from 'moment';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
  task: Task = new Task
  date: Date = new Date();
  addForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private taskService: TaskService) { }
  tasks: Task[] = new Array
  title: any   //serach by its title at search engine


  p: number = 1; //currentpaginationPage
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data['tasks']
    })
    this.addForm = this.formBuilder.group({
      title: [''],
      status: ['New'],
      priority: ['Medium'],
      date: ['']
    })

    //validations
    this.addForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'status': new FormControl(null, Validators.required),
      'priority': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required)

    });
  }

  //searchengine
  Search() {
    if (this.title == "") {
      this.ngOnInit();

    } else {
      this.tasks = this.tasks.filter(res => {
        return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
      })
    }
  }
  //addTask
  addTask() {
    this.task.title = this.addForm.value.title
    this.task.status = this.addForm.value.status
    this.task.priority = this.addForm.value.priority
    this.task.date = this.addForm.value.date
    this.taskService.addTask(this.task).subscribe((data) => {
      this.tasks.push(this.task)
      alert("Task Added Successfully!!!")
    },
      (err) => {
        alert('error occured')
      })
  }

  // putTask() {

  // }
  deleteTask(id: number) {
    let task = this.tasks[id]
    let _id = task._id
    this.taskService.deleteTask(_id).subscribe((res) => {
      this.tasks.splice(id, 1)
    })
  }
}
