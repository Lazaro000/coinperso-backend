import { DomainFormatException } from './domain-format.exception.js';

export class InvalidUserFormatException extends DomainFormatException {
  constructor() {
    super('Invalid user format');
  }
}
