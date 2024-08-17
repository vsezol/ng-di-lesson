import { Inject } from '@angular/core';
import { IdGenerator } from './id-generator';
import { NAME_PREFIX_TOKEN } from './name-prefix.token';

export interface TodoItem {
  id: number;
  name: string;
}

// Доработайте этот код

export class TodosService {
  constructor(
    @Inject(NAME_PREFIX_TOKEN) private readonly namePrefix: string,
    private readonly idGenerator: IdGenerator
  ) {}

  // используйте для хранения данных
  #todos: TodoItem[] = [];

  getAll(): TodoItem[] {
    /* здесь будет ваша реализация */
  }

  getById(id: number): TodoItem | undefined {
    /* здесь будет ваша реализация */
  }

  add(name: string): void {
    /* здесь будет ваша реализация */
  }

  remove(id: number): void {
    /* здесь будет ваша реализация */
  }
}
