// import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user";
import { updateUserProfileValidator } from "#validators/user";
import { HttpContext } from "@adonisjs/core/http";

export default class ProfilesController {
  async update ({ request, auth, response }: HttpContext) {
    if (!auth.user) {
      return response.forbidden('You must be logged in to update your profile');
    }
    const payload = request.validateUsing(updateUserProfileValidator);
    const user = await User.findOrFail(auth.user.id);
    user.merge(payload);
    return user.save();
  }
}
