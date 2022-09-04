import { UserLoginController } from '#Controllers/user-login.controller.js';
import { UserRegisterController } from '#Controllers/user-register.controller.js';
import { UserRepository } from '#Repositories/user.repository.js';
import { UserLoginUseCase } from '#UseCases/user-login.usecase.js';
import { UserRegisterUseCase } from '#UseCases/user-register.usecase.js';
import awilix from 'awilix';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

// Use cases
container.register({
  userLoginUseCase: awilix.asClass(UserLoginUseCase).singleton(),
  userRegisterUseCase: awilix.asClass(UserRegisterUseCase).singleton(),
});

// Controllers
container.register({
  userLoginController: awilix.asClass(UserLoginController).singleton(),
  userRegisterController: awilix.asClass(UserRegisterController).singleton(),
});

// Repositories
container.register({
  userRepository: awilix.asClass(UserRepository).singleton(),
});

export default container;
