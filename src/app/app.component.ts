import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem, TodosService } from './todos.service';
import {IdGeneratorService} from "./id-generator.service";
import {IdGenerator} from "./id-generator";
import {NAME_PREFIX_TOKEN} from "./name-prefix.token";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [FormsModule],
  providers: [
    // Ваши изменения начинаются здесь
    {
      provide: IdGenerator,
      useClass: IdGeneratorService
    },
    {
      provide: NAME_PREFIX_TOKEN,
      useValue: 'АБОБУС'
    },
    {
      provide: TodosService,
      useClass: TodosService
    }
    // и заканчиваются здесь
  ],
})
export class AppComponent {
  todoName: string = '';

  get todos(): TodoItem[] {
    return this.todosService.getAll();
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
