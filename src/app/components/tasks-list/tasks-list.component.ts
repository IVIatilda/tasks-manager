import { Component, OnInit } from '@angular/core';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Task, TaskService } from '../../shared/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { map } from 'rxjs';

const MODALS: { [name: string]: any } = {
  confirmModal: ConfirmModalComponent,
  formModal: TaskFormComponent,
};

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  openPanel: number | null = null;
  hideComplete = true;

  constructor(
    private taskService: TaskService,
    public dialog: Dialog
  ) {}

  ngOnInit() {
    this.taskService.getTasks().pipe(
      map(data => {
        const currentsTasks = data.filter(t => !t.complete);
        const completeTasks = data.filter(t => t.complete);
        return [...currentsTasks, ...completeTasks];
      })
    ).subscribe((tasks) => (this.tasks = tasks));
  }

  get currentsTasksCount() {
    return this.tasks.filter(t => !t.complete).length;
  }

  openModal(event: MouseEvent, name: string, task?: Task) {
    event.stopPropagation();
    this.dialog.open<string>(MODALS[name], {
      width: '450px',
      data: task,
    });
  }

  setDone(event: MouseEvent, task: Task) {
    event.stopPropagation();
    task.complete = new Date();
    this.taskService.updateTask(task);
  }

  returnTask(event: MouseEvent, task: Task) {
    event.stopPropagation();
    delete task.complete;
    this.taskService.updateTask(task);
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.taskService.sortTasks(this.tasks);
  }
}
