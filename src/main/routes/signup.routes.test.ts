// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';

import app from '../config/app';

describe('SignUp Routes', () => {
  test('Should return a new account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      })
      .expect(200);
  });
});
