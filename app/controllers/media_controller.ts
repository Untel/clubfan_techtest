// import type { HttpContext } from '@adonisjs/core/http'

import Media from "#models/media"
import { MediaPresenter } from "#presenters/media"
import { feedValidator } from "#validators/feed"
import { createMediaValidator } from "#validators/media"
import { HttpContext } from "@adonisjs/core/http"

export default class MediaController {
  async store ({ request, auth }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(createMediaValidator)
    const media = await Media.create({
      url: payload.url,
      title: payload.title,
      description: payload.description,
      userId: user.id
    })
    return new MediaPresenter(media).toJSON();
  }

  async show ({ params }: HttpContext) {
    const media = await Media.findOrFail(params.id)
    return new MediaPresenter(media).toJSON();
  }

  // use , etc. to paginate
  async feed ({ auth, request }: HttpContext) {
    const { take = 10, page = 1, sort = 'asc' } = await request.validateUsing(feedValidator)
    const user = auth.user!
    await user.preload('followers');
    const feed = await Media.query()
      .whereNot('user_id', user.id)
      .whereIn('user_id', user.followers.map((u) => u.id))
      .whereNotExists((query) => {
        query
          .from('user_media_impressions')
          .where('user_id', user.id)
          .whereRaw('media_id = media.id')
      })
      .orderBy('created_at', sort)
      .paginate(page, take);

    user.related('impressions').attach(feed.all().map((m) => m.id));
    return feed;
  }

  async see ({ auth, request }: HttpContext) {
    const user = auth.user!
    const media = await Media.findOrFail(request.param('id'))
    await media.related('impressions').attach([user.id])
    return new MediaPresenter(media).toJSON();
  }

  async delete ({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const media = await Media.findOrFail(request.param('id'))
    if (media.userId !== user.id) {
      return response.forbidden({ message: 'You can only delete your own media' })
    }
    await media.delete()
    return response.ok({ message: 'Media deleted' });
  }
}
