import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class UserProfileController {
  constructor({ userProfileUseCase }) {
    this.userProfileUseCase = userProfileUseCase;
  }

  async execute(req, res, next) {
    const { userId } = req;

    try {
      const user = await this.userProfileUseCase.execute(userId);

      return res.status(HTTP_STATUS.OK).send(user);
    } catch (err) {
      next(err);
    }
  }
}
