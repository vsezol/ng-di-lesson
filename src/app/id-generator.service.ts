import { Injectable } from '@angular/core';
import { IdGenerator } from './id-generator';

// Доработайте этот код
@Injectable()
export class IdGeneratorService extends IdGenerator {
  private id: number = 0;

  generate(): number {
    return ++this.id;
  }
}
