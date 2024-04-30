import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Media from '#models/media'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare profilePictureUrl: string | null

  @column()
  declare description: DateTime | null

  @manyToMany(() => User, {
    pivotTable: 'user_followers',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'follower_id',
    pivotTimestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  })
  declare followers: ManyToMany<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'user_followers',
    pivotForeignKey: 'follower_id',
    pivotRelatedForeignKey: 'user_id',
    pivotTimestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  })
  declare following: ManyToMany<typeof User>

  @manyToMany(() => Media, {
    pivotTable: 'user_media_impressions',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'media_id',
    pivotTimestamps: true,
  })
  declare impressions: ManyToMany<typeof Media>

  @hasMany(() => Media)
  declare media: HasMany<typeof Media>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
