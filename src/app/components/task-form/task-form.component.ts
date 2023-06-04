import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Task, TaskService } from '../../shared/task.service';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private taskService: TaskService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public task: Task
  ) {}

  taskForm: UntypedFormGroup = this.fb.group({});

  ngOnInit() {
    this.taskForm = this.fb.group({
      id: [this.task?.id || null],
      title: [this.task?.title || '', [Validators.required]],
      description: [this.task?.description || ''],
      deadline: [this.task?.deadline || null, [Validators.required]],
    });
  }

  addTask() {
    this.taskForm.markAllAsTouched();
    if (this.taskForm.valid) {
      const task = this.taskForm.getRawValue();
      this.taskService.addTask(task);
    }
  }

  saveTask() {
    this.taskForm.markAllAsTouched();
    if (this.taskForm.valid) {
      const task = this.taskForm.getRawValue();
      if (this.task?.id) {
        this.taskService.updateTask(task);
      } else {
        this.taskService.addTask(task);
      }
      this.dialogRef.close()
    }
  }
}
