import { Inject, Injectable } from '@angular/core';
import { IdGenerator } from './id-generator';
import { NAME_PREFIX_TOKEN } from './name-prefix.token';

export interface TodoItem {
  id: number;
  name: string;
}

@Injectable({ providedIn: "root" })


export class TodosService {
  constructor(
    @Inject(NAME_PREFIX_TOKEN) private readonly namePrefix: string,
    private readonly idGenerator: IdGenerator
  ) {}

  // используйте для хранения данных
  #todos: TodoItem[] = [];

  getAll(): TodoItem[] {
    return this.#todos;
  }

  getById(id: number): TodoItem | undefined {
    return this.#todos.find((item) => item.id === id)
  }

  add(name: string): void {
    const newId = this.idGenerator.generate();
    const newItem: TodoItem = {id: newId, name: `${this.namePrefix} ${name}`}
    this.#todos.push(newItem);
  }

  remove(id: number): void {
    this.#todos = this.#todos.filter((item) => item.id !== id)
  }
}
