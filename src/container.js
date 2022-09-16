import { UserLoginController } from '#Controllers/user-login.controller.js';
import { UserProfileController } from '#Controllers/user-profile.controller.js';
import { UserRegisterController } from '#Controllers/user-register.controller.js';
import { UserRepository } from '#Repositories/user.repository.js';
import { UserLoginUseCase } from '#UseCases/user-login.usecase.js';
import { UserProfileUseCase } from '#UseCases/user-profile.usecase.js';
import { UserRegisterUseCase } from '#UseCases/user-register.usecase.js';
import awilix from 'awilix';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

// Use cases
container.register({
  // User
  userLoginUseCase: awilix.asClass(UserLoginUseCase).singleton(),
  userRegisterUseCase: awilix.asClass(UserRegisterUseCase).singleton(),
  userProfileUseCase: awilix.asClass(UserProfileUseCase).singleton(),
});

// Controllers
container.register({
  // User
  userLoginController: awilix.asClass(UserLoginController).singleton(),
  userRegisterController: awilix.asClass(UserRegisterController).singleton(),
  userProfileController: awilix.asClass(UserProfileController).singleton(),
});

// Repositories
container.register({
  userRepository: awilix.asClass(UserRepository).singleton(),
});

export default container;
