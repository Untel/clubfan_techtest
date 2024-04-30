import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { updateUserProfileValidator } from '#validators/user'

export default class UsersController {

  async show({
    request,
  }: HttpContext) {
    return User.find(request.param('id'))
  }

  async follow({
    auth,
    request,
  }: HttpContext) {
    const user = auth.user!
    const target = await User.findOrFail(request.param('target'))
    await user.related('followers').attach([target.id])
    const saved = await user.save();
    return saved;
  }
}
