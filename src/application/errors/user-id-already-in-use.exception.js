import { ApplicationConflictException } from './application-conflict.exception.js';

export class UserIdAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('User Id is already in use');
  }
}
