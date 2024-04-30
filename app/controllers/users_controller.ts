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
    await target.related('followers').attach([user.id])
    const saved = await user.save();
    return new UserPresenter(saved).toJSON();
  }

  async update ({ request, auth }: HttpContext) {
    const user = auth.user!;
    const payload = await request.validateUsing(updateUserProfileValidator);
    user.merge(payload);
    return new UserPresenter(await user.save()).toJSON();
  }

  async show ({ auth }: HttpContext) {
    const user = await User.query()
      .preload('followers')
      .preload('following')
      .preload('media')
      .where('id', auth.user!.id)
      .firstOrFail();
    return new UserPresenter(user).toJSON();
  }

  async delete ({ auth, response }: HttpContext) {
    const user = await User.findOrFail(auth.user!.id);
    await user.delete();
    return response.status(204);
  }
}
