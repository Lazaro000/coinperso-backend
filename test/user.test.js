import config from '#Config/config.js';
import test from 'ava';
import got from 'got';
import { generateRandomUser } from './utils/generate-random-user.js';
import { expectStatusCode } from './utils/generic-expects.js';
import { setupTests } from './utils/setup-tests.js';

setupTests(test);

const endpointRegister = `http://localhost:${config.PORT}/register`;
const endpointLogin = `http://localhost:${config.PORT}/login`;

const testUserA = generateRandomUser();
const testUserB = generateRandomUser();

const fetchRegister = async (t, user) => {
  try {
    const response = await got.post(endpointRegister, {
      json: user,
      throwHttpErrors: false,
    });

    return response;
  } catch (err) {
    t.fail(err);
  }
};

const fetchLogin = async (t, user) => {
  try {
    const response = await got.post(endpointLogin, {
      json: user,
      throwHttpErrors: false,
    });

    return response;
  } catch (err) {
    t.fail(err);
  }
};

/**
 * List of test in user
 *
 * * User Register successfully
 * * User Register failed - Duplicated ID
 * * User Register failed - Duplicated email
 * * User Register failed - Invalid ID format
 * * User Register failed - Invalid name format
 * * User Register failed - Invalid email format
 * * User Register failed - Invalid password format
 * * User Register failed - Missing fields
 * * User Register failed - Unnecesary fields
 * * User Login successfully
 */

test.serial('User Register succesfully', async (t) => {
  const response = await fetchRegister(t, testUserA);

  expectStatusCode(t, 201, response);
});

test.serial('User Register failed - Duplicated ID', async (t) => {
  const user = {
    ...testUserB,
    id: testUserA.id,
  };

  const response = await fetchRegister(t, user);

  expectStatusCode(t, 409, response);
});

test.serial('User Register failed - Duplicated email', async (t) => {
  const user = {
    ...testUserB,
    email: testUserA.email,
  };

  const response = await fetchRegister(t, user);

  expectStatusCode(t, 409, response);
});

test('User Register failed - Invalid ID format', async (t) => {
  const user = {
    ...testUserA,
    id: 'invalid-uuid',
  };

  const response = await fetchRegister(t, user);

  expectStatusCode(t, 400, response);
});

test('User Register failed - Invalid name format', async (t) => {
  const user = {
    ...testUserA,
    name: 'name-with-./*',
  };

  const response = await fetchRegister(t, user);

  expectStatusCode(t, 400, response);
});

test('User Register failed - Invalid email format', async (t) => {
  const user = {
    ...testUserA,
    email: 'emailatemail.com',
  };

  const response = await fetchRegister(t, user);

  expectStatusCode(t, 400, response);
});

test('User Register failed - Invalid password format', async (t) => {
  const user = {
    ...testUserA,
    password: '1234',
  };

  const response = await fetchRegister(t, user);

  expectStatusCode(t, 400, response);
});

test('User Register failed - Missing fields', async (t) => {
  const { id, name, email } = testUserA;

  const user = { id, name, email };

  const response = await fetchRegister(t, user);

  expectStatusCode(t, 400, response);
});

test('User Register failed - Unnecesary fields', async (t) => {
  const user = {
    ...testUserA,
    age: 25,
  };

  const response = await fetchRegister(t, user);

  expectStatusCode(t, 400, response);
});

test('User Login successfully', async (t) => {
  const { email, password } = testUserA;

  const response = await fetchLogin(t, { email, password });

  expectStatusCode(t, 200, response);
});
