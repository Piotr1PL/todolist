import { Component, Input, OnInit } from '@angular/core';
import { TodoServiceTsService, Todo } from '../../../todo.service.ts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.css']
})
export class TaskListComponentComponent implements OnInit {
  @Input() todos: any[] = [];  

  constructor(private todoService: TodoServiceTsService) {}

  ngOnInit(): void {
    if (!this.todos || this.todos.length === 0) {
      this.loadTasks();
    }
  }


  loadTasks(): void {
    this.todoService.getTodos().subscribe({
      next: (tasks) => {
        this.todos = tasks;  
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
      }
    });
  }

  toggleDone(task: Todo): void {
    task.completed = !task.completed;
    this.updateTask(task);  
  }

  updateTask(updatedTask: Todo): void {
    this.todoService.updateTodo(updatedTask.id, updatedTask).subscribe();
  }

  deleteTask(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((task) => task.id !== id); 
    });
  }

  addTodo(newTaskTitle: string): void {
    this.todoService.addTodo(newTaskTitle).subscribe((addedTask) => {
      this.todos.push(addedTask);  
    });
  }

  clearAllTasks(): void {
    if (confirm('Are you sure you want to clear all tasks?')) {
      this.todos = [];  
      this.todoService.clearLocalStorage();  
    }
  }
}
