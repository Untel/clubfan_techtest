import Media from "#models/media";

export class MediaPresenter {
  constructor(private media: Media) {}

  public toJSON() {
    return {
      id: this.media.id,
      url: this.media.url,
      impressions: this.media.impressions,
      createdAt: this.media.createdAt,
      title: this.media.title,
      description: this.media.description,
    }
  }
}

export class MediasPresenter {
  constructor(private medias: Media[]) {}

  toJSON() {
    return this.medias.map(media => new MediaPresenter(media).toJSON());
  }
}
