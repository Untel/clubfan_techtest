import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { updateUserProfileValidator } from '#validators/user'

export default class UsersController {

  async show({
    request,
  }: HttpContext) {
    return User.find(request.param('id'))
  }
}
