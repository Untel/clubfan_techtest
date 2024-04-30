import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { UserPresenter } from '../presenters/user.js'
import { updateUserProfileValidator } from '#validators/user';

export default class UsersController {

  async follow({
    auth,
    request,
  }: HttpContext) {
    const user = auth.user!
    const target = await User.findOrFail(request.param('target'))
    await user.related('followers').attach([target.id])
    const saved = await user.save();
    return new UserPresenter(saved).toJSON();
  }

  async update ({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(updateUserProfileValidator);
    const user = await User.findOrFail(auth.user!.id);
    user.merge(payload);
    const saved = await user.save();
    return new UserPresenter(saved).toJSON();
  }

  async show ({ auth }: HttpContext) {
    const user = await User.findOrFail(auth.user!.id);
    await Promise.all([
      user.preload('followers'),
      user.preload('media'),
    ]);
    return new UserPresenter(user).toJSON();
  }

  async delete ({ auth, response }: HttpContext) {
    const user = await User.findOrFail(auth.user!.id);
    await user.delete();
    return response.status(204);
  }
}
