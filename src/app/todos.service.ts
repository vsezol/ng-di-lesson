import { Inject, Injectable } from '@angular/core';
import { IdGenerator } from './id-generator';
import { NAME_PREFIX_TOKEN } from './name-prefix.token';

export interface TodoItem {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  #todos: TodoItem[] = [];

  constructor(
    @Inject(NAME_PREFIX_TOKEN) private readonly namePrefix: string,
    private readonly idGenerator: IdGenerator
  ) {}

  getAll(): TodoItem[] {
    return [...this.#todos];
  }

  getById(id: number): TodoItem | undefined {
    return this.#todos.find(todo => todo.id === id);
  }

  add(name: string): void {
    const id = this.idGenerator.generate();
    const prefixedName = `${this.namePrefix} ${name}`; 
    const newTodo: TodoItem = { id, name: prefixedName };
    this.#todos.push(newTodo); 
  }

  remove(id: number): void {
    this.#todos = this.#todos.filter(todo => todo.id !== id); 
  }
}