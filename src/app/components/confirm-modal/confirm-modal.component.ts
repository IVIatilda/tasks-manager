import { Component, Inject } from '@angular/core';
import { Task, TaskService } from '../../shared/task.service';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

  constructor(
    private taskService: TaskService,
    public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public task: Task
  ) {}

  deleteTask(task: Task) {
    if (task) {
      this.taskService.deleteTask(task);
      this.dialogRef.close()
    }
  }
}
