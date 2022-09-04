import { signAsync } from '#Services/jwt.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MissingFieldsFormatException } from '../errors/missing-fields.exception.js';
import { UnnecesaryFieldsFormatException } from '../errors/unnecessary-fields.exception.js';

export class UserLoginController {
  constructor({ userLoginUseCase }) {
    this.userLoginUseCase = userLoginUseCase;
  }

  async execute(req, res, next) {
    const { email, password, ...rest } = req.body;

    try {
      if (!email || !password) throw new MissingFieldsFormatException();

      if (Object.keys(rest).length !== 0)
        throw new UnnecesaryFieldsFormatException();

      const id = await this.userLoginUseCase.execute(email, password);

      const payload = { id };
      const signOptions = { algorithm: 'HS512', expiresIn: '7d' };

      const token = await signAsync(payload, signOptions);

      return res.status(HTTP_STATUS.OK).send({ token });
    } catch (err) {
      next(err);
    }
  }
}
