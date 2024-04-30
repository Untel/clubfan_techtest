// import type { HttpContext } from '@adonisjs/core/http'

import Media from "#models/media"
import { createMediaValidator } from "#validators/media"
import { HttpContext } from "@adonisjs/core/http"

export default class MediaController {
  async store ({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(createMediaValidator)
    const media = await Media.create({
      url: payload.url,
      userId: user.id
    })
    return await media.save();
  }

  async show ({ params }: HttpContext) {
    const media = await Media.findOrFail(params.id)
    return media
  }

  async feed ({ auth }: HttpContext) {
    const user = auth.user!
    await user.preload('followers');
    return Media.query()
      .whereNot('user_id', user.id)
      .whereIn('user_id', user.followers.map((u) => u.id))
      .whereNotExists((query) => {
        query
          .from('user_media_impressions')
          .where('user_id', user.id)
          .whereRaw('media_id = media.id')
      })
      .orderBy('created_at', 'desc')
      .limit(10);
  }

  async see({ auth, request }: HttpContext) {
    const user = auth.user!
    const media = await Media.findOrFail(request.param('id'))
    console.log("Media is", media.id);
    await media.related('impressions').attach([user.id])
    return media;
  }
}
