import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { MockTodoService } from './mock-todo-service.service';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoServiceTsService {
  private storageKey: string = 'todos';  

  constructor(private mockTodoService: MockTodoService) {}

  // Ładuj zadania z localStorage
  private loadTodos(): Todo[] {
    const todosJson = localStorage.getItem(this.storageKey);
    if (todosJson) {
      try {
        return JSON.parse(todosJson);
      } catch (e) {
        console.error('Błąd przy parsowaniu danych z localStorage', e);
        return [];
      }
    }
    return [];  
  }


  private saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

 
  getTodos(): Observable<Todo[]> {
    const todosFromLocalStorage = this.loadTodos(); 
    if (todosFromLocalStorage.length === 0) {
      return this.mockTodoService.getTodos().pipe(  
        delay(500), 
        tap((todos) => this.saveTodos(todos))
      );
    } else {
      return of(todosFromLocalStorage).pipe(delay(500));  
    }
  }

 
  addTodo(title: string): Observable<Todo> {
    const newTodo: Todo = { id: Date.now(), title, completed: false };
    const todos = this.loadTodos();
    todos.push(newTodo);  
    this.saveTodos(todos);  
    return of(newTodo).pipe(delay(500));  
  }

 
  deleteTodo(id: number): Observable<{ success: boolean }> {
    let todos = this.loadTodos();
    todos = todos.filter((todo) => todo.id !== id);  
    this.saveTodos(todos);  
    return of({ success: true }).pipe(delay(500));  
  }


  clearLocalStorage(): void {
    localStorage.removeItem(this.storageKey);  
  }
  updateTodo(id: number, updatedTodo: Partial<Todo>): Observable<Todo | null> {
    const todos = this.loadTodos();
    const todo = todos.find((t) => t.id === id); 
    if (todo) {
      Object.assign(todo, updatedTodo);  
      this.saveTodos(todos);  
      return of(todo).pipe(delay(500));  
    }
    return of(null);  
  }
}
