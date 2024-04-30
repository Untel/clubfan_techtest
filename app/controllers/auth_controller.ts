import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'

export default class UserController {
  async index({}: HttpContext) {
    // return list of posts
  }

  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data);
    const user = User.create(payload);
    return user;
  }

  async show({}: HttpContext) {
    // return post by id
  }
}
