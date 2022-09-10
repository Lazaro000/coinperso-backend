import uuid from 'uuid-random';
import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from './value-object.js';

export class ProfilePicVO extends ValueObject {
  equals(valueObject) {
    return (
      valueObject instanceof ProfilePicVO && this.value === valueObject.value
    );
  }

  // ! Bad validation
  assertIsValid(value) {
    if (!uuid.test(value)) {
      throw new VOFormatException(ProfilePicVO.name, value);
    }
  }
}
