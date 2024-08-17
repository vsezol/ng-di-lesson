import { DebugElement, Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { IdGenerator } from '../id-generator';
import { NAME_PREFIX_TOKEN } from '../name-prefix.token';
import { TodosService } from '../todos.service';

describe('Тесты', () => {
  let fixture: ComponentFixture<AppComponent>;
  let componentInjector: Injector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    componentInjector = fixture.debugElement.injector;
  });

  describe('IdGeneratorService', () => {
    it('должен быть предоставлен по IdGenerator', () => {
      const idGenerator = componentInjector.get(IdGenerator);
      expect(idGenerator).toBeInstanceOf(IdGenerator);
    });

    it('должен создавать числовые id. Каждое следующее id должно быть больше на 1.', () => {
      const idGenerator = componentInjector.get(IdGenerator);

      expect(idGenerator.generate()).toBe(1);
      expect(idGenerator.generate()).toBe(2);
      expect(idGenerator.generate()).toBe(3);
      expect(idGenerator.generate()).toBe(4);
      expect(idGenerator.generate()).toBe(5);
    });
  });

  describe('NAME_PREFIX_TOKEN', () => {
    it('должен содержать значение АБОБУС', () => {
      const namePrefix = componentInjector.get(NAME_PREFIX_TOKEN);
      expect(namePrefix).toBe('АБОБУС');
    });
  });

  describe('TodosService', () => {
    let todosService: TodosService;

    beforeEach(() => {
      todosService = componentInjector.get(TodosService);
    });

    it('должен быть предоставлен в секции провайдеров', () => {
      expect(todosService).toBeInstanceOf(TodosService);
    });

    it('по умолчанию не должен иметь todos', () => {
      expect(todosService.getAll()).toEqual([]);
    });

    it('должен уметь добавлять todo', () => {
      todosService.add('ПОМЫТЬ ПОСУДУ');
      todosService.add('ПОКАКАТЬ');
      todosService.add('СОСКУФИТЬСЯ');

      expect(todosService.getAll()).toEqual([
        {
          id: 1,
          name: 'АБОБУС ПОМЫТЬ ПОСУДУ',
        },
        {
          id: 2,
          name: 'АБОБУС ПОКАКАТЬ',
        },
        {
          id: 3,
          name: 'АБОБУС СОСКУФИТЬСЯ',
        },
      ]);
    });

    it('должен уметь получать todo по id', () => {
      todosService.add('ПОМЫТЬ ПОСУДУ');

      expect(todosService.getById(1)).toEqual({
        id: 1,
        name: 'АБОБУС ПОМЫТЬ ПОСУДУ',
      });
    });

    it('должен уметь удалять todo', () => {
      todosService.add('ПОМЫТЬ ПОСУДУ');

      expect(todosService.getAll()).toEqual([
        {
          id: 1,
          name: 'АБОБУС ПОМЫТЬ ПОСУДУ',
        },
      ]);

      todosService.remove(1);

      expect(todosService.getAll()).toEqual([]);
    });
  });

  describe('AppComponent', () => {
    it('Должен работать в связке с TodosService', () => {
      fixture.debugElement.componentInstance.todoName = 'СТАТЬ СИГМОЙ';

      addTodo();

      expect(hasElement(`todo-${1}`)).toBeTrue();

      deleteTodo(1);

      expect(hasElement(`todo-${1}`)).toBeFalse();
    });
  });

  function addTodo(): void {
    findElement('addTodoButton').nativeElement.click();
    fixture.detectChanges();
  }

  function deleteTodo(id: number) {
    findElement(`todo-${id}`).query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
  }

  function hasElement(testId: string) {
    try {
      findElement(testId);

      return true;
    } catch {
      return false;
    }
  }

  function findElement(testId: string): DebugElement {
    const element = fixture.debugElement.query(
      By.css(`[data-testid="${testId}"]`)
    );

    if (!element) {
      throw new Error(`Не удалось найти элемент ${testId}!`);
    }

    return element;
  }
});
