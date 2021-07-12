import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  editForm !: FormGroup;
   items = [
    'New','On progress','Done'
  ]
  task:Task = new Task
  id:any
  constructor(private route: ActivatedRoute, private taskService:TaskService, private navigator: Router,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.taskService.getTask(this.id).subscribe((data)=>{
      this.task.title = data['task'].title
      this.task.status = data['task'].status
      this.task.priority = data['task'].priority
      this.task.date = data['task'].date
     // console.log('task')
     // console.log(this.task)
    })
    this.editForm = this.formBuilder.group({
      title: [''],
      status: [''],
      priority: [''],
      date: ['']
    })
  }
  editTask(){
    this.task.title = this.editForm.value.title
    this.task.status = this.editForm.value.status
    this.task.priority = this.editForm.value.priority
    this.task.date = this.editForm.value.date
    //console.log(this.task)
    this.taskService.editTask(this.task,this.id).subscribe((data)=>{
      this.navigator.navigateByUrl('');
    })
  }

}
