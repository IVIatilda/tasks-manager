import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description?: string;
  deadline: Date;
  complete?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  initialVal: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject(this.initialVal);
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    this.tasksSubject.next(tasks);
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Task): void {
    task.id = Date.now();
    const tasks = [task, ...this.tasksSubject.value]; // this.tasksSubject.value.concat(task);
    this.saveTasks(tasks);
  }

  deleteTask(task: Task): void {
    const tasks = this.tasksSubject.value.filter(t => t.id !== task.id);
    this.saveTasks(tasks);
  }

  updateTask(task: Task): void {
    const tasks = this.tasksSubject.value.map(t => t.id === task.id ? {...t, ...task} : t);
    this.saveTasks(tasks);
  }

  sortTasks(tasks: Task[]) {
    this.saveTasks(tasks);
  }
}
