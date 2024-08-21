import { IdGenerator } from './id-generator';

export class IdGeneratorService extends IdGenerator {
  private currentId: number = 0;
  generate(): number {
    return ++this.currentId;
}
}
