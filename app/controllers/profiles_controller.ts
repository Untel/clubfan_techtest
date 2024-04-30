// import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user";
import { updateUserProfileValidator } from "#validators/user";
import { HttpContext } from "@adonisjs/core/http";

export default class ProfilesController {
  async update ({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(updateUserProfileValidator);
    const user = await User.findOrFail(auth.user!.id);
    console.log('payload', payload);
    user.merge(payload);
    return user.save();
  }

  async show ({ auth, params }: HttpContext) {
    const user = await User.findOrFail(auth.user!.id);
    return user;
  }

  async delete ({ auth, response }: HttpContext) {
    const user = await User.findOrFail(auth.user!.id);
    await user.delete();
    return response.status(204);
  }
}
