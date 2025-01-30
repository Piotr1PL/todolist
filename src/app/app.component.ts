import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MockTodoService } from '../mock-todo-service.service';
import { AddTaskComponentComponent } from './components/add-task-component/add-task-component.component';
import { TaskListComponentComponent } from './components/task-list-component/task-list-component.component';
import { TodoServiceTsService,Todo } from '../todo.service.ts.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, AddTaskComponentComponent, TaskListComponentComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MockTodoService]
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];  

  constructor(private todoService: TodoServiceTsService) {}

  ngOnInit(): void {
    this.loadTodos();  
  }


  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos = data;  
      },
      error: (err) => {
        console.error('Błąd podczas ładowania zadań:', err);
      }
    });
  }

  addTodo(newTaskTitle: string): void {
    this.todoService.addTodo(newTaskTitle).subscribe({
      next: (addedTask) => {
        this.todos.push(addedTask); 
      },
      error: (err) => {
        console.error('Błąd podczas dodawania zadania:', err);
      }
    });
  }


  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== id);  
      },
      error: (err) => {
        console.error('Błąd podczas usuwania zadania:', err);
      }
    });
  }
}