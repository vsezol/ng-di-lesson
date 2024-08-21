import { IdGenerator } from './id-generator';

// Доработайте этот код

export class IdGeneratorService extends IdGenerator {
    private id = 0;

    override generate(): number {
        return ++this.id;
    }
}
