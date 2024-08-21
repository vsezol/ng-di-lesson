import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem, TodosService } from './todos.service';
import { IdGeneratorService } from './id-generator.service';
import { NAME_PREFIX_TOKEN } from './name-prefix.token';
import { IdGenerator } from './id-generator';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [FormsModule],
  providers: [
    {
      provide: IdGenerator,
      useClass: IdGeneratorService,
    },
    
    {
      provide: NAME_PREFIX_TOKEN,
      useValue: 'АБОБУС',
    },
    
    TodosService

  ],
})

export class AppComponent {
  todoName: string = '';

  get todos(): TodoItem[] {
    const todos = this.todosService.getAll();
    return todos;
  }

  constructor(private readonly todosService: TodosService) {}

  addTodo(): void {
    const name = this.todoName.trim();

    if (!name) {
      return;
    }

    this.todoName = '';
    this.todosService.add(name);
  }

  remove(id: number): void {
    this.todosService.remove(id);
  }
}
