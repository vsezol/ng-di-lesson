import { Injectable } from '@angular/core';
import { IdGenerator } from './id-generator';

// Доработайте этот код

@Injectable({
    providedIn: 'root',
})
export class IdGeneratorService extends IdGenerator {
    #id = 0;
    override generate(): number {
        this.#id++;
        return this.#id;
    }
}
