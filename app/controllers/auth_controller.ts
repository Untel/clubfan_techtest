import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'
import { UserPresenter } from '#presenters/user';

export default class AuthController {

  async whoami({ auth }: HttpContext) {
    return new UserPresenter(auth.user!).toJSON();
  }

  async signin({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    if (user) {
      const token = await User.accessTokens.create(user)
      return {
        type: 'bearer',
        value: token.value!.release(),
      }
    }
    return response.forbidden('Invalid credentials');
  }

  async signup({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator);

    if (payload.password !== payload.repeatPassword) {
      return response.forbidden('Passwords do not match');
    }
    const user = await User.create({
      email: payload.email,
      password: payload.password,
      username: payload.username,
    });
    const token = await User.accessTokens.create(user)
    return {
      type: 'bearer',
      value: token.value!.release(),
    };
  }
}
