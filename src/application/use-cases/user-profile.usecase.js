import { UuidVO } from '#ValueObjects/uuid.vo.js';
import { VOFormatException } from '../../domain/errors/vo-format.exception.js';
import { ApplicationUnauthorizedException } from '../errors/application-unauthorized.exception.js';

export class UserProfileUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    try {
      const userId = new UuidVO(id);

      const existingUser = await this.userRepository.findById(userId);

      if (!existingUser) throw new ApplicationUnauthorizedException();

      return {
        id: existingUser.getId(),
        name: existingUser.getName(),
        email: existingUser.getEmail(),
        profilePic: existingUser.getProfilePic(),
      };
    } catch (err) {
      if (err instanceof VOFormatException)
        throw new ApplicationUnauthorizedException();

      throw err;
    }
  }
}
