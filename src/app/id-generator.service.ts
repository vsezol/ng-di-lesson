import { Injectable } from '@angular/core';
import { IdGenerator } from './id-generator';

// Доработайте этот код
@Injectable({
    providedIn: 'root',
})

export class IdGeneratorService extends IdGenerator {
    private id = 0;

    override generate(): number {
        return ++this.id;
    }
}
