import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { IdGenerator } from './id-generator';
import { NAME_PREFIX_TOKEN } from './name-prefix.token';

export interface TodoItem {
  id: number;
  name: string;
}

// Доработайте этот код
@Injectable({
  providedIn: 'root' 
})
export class TodosService {
  constructor(
    @Inject(NAME_PREFIX_TOKEN) private readonly namePrefix: string,
    private readonly idGenerator: IdGenerator
  ) {}

  // используйте для хранения данных
  #todos: TodoItem[] = [];

  getAll(): TodoItem[] {
    return this.#todos; 
    /* здесь будет ваша реализация */
  }

  getById(id: number): TodoItem | undefined {
    /* здесь будет ваша реализация */
    return this.#todos.find(todo => todo.id === id);
  }

  add(name: string): void {
    /* здесь будет ваша реализация */
    const newTodo: TodoItem = {
      id: this.idGenerator.generate(), 
      name: `${this.namePrefix} ${name}` 
    };
    this.#todos.push(newTodo); 
  }

  remove(id: number): void {
    /* здесь будет ваша реализация */
    this.#todos = this.#todos.filter(todo => todo.id !== id)
  }
}
