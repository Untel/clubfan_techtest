import User from "#models/user";
import { MediaPresenter } from "#presenters/media";

export class UserPresenter {
  constructor(private user: User) {}

  public toJSON() {
    return {
      id: this.user.id,
      username: this.user.username,
      email: this.user.email,
      profilePictureUrl: this.user.profilePictureUrl,
      description: this.user.description,
      followersCount: this.user.$hasRelated('followers') ? this.user.followers?.length : undefined,
      mediaCount: this.user.$hasRelated('media') ? this.user.media?.length : undefined,
      media: this.user.$hasRelated('media') ? this.user.media.map(media => new MediaPresenter(media).toJSON()) : undefined,
    }
  }
}

export class UsersPresenter {
  constructor(private users: User[]) {}

  toJSON() {
    return this.users.map(user => new UserPresenter(user).toJSON());
  }
}
