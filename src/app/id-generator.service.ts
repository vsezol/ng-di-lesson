import { IdGenerator } from './id-generator';
import { Injectable } from '@angular/core';
// Доработайте этот код

@Injectable({
    providedIn: "root"
  })
export class IdGeneratorService extends IdGenerator {
    #id = 1;
    override generate(): number {
        return this.#id++;
      }
}
