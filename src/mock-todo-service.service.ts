import { Injectable } from '@angular/core';
import { of } from 'rxjs';  // 'of' pozwala zwrócić dane jakby były asynchroniczne
import { delay } from 'rxjs/operators';  // Dodajemy opóźnienie, aby zasymulować czas odpowiedzi API

@Injectable({
  providedIn: 'root',
})
export class MockTodoService {
  private todos: any[] = [
    { id: 1, title: 'task1', completed: false },
    { id: 2, title: 'task2', completed: true },
    { id: 3, title: 'task3', completed: false }
  ];

  // Symulacja pobierania zadań z "API"
  getTodos() {
    return of(this.todos).pipe(delay(500));  
  }

  addTodo(newTask: any) {
    const newTaskWithId = { ...newTask, id: Date.now() };
    this.todos.push(newTaskWithId);
    return of(newTaskWithId).pipe(delay(250));  
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return of({ success: true }).pipe(delay(250));  
  }
}
