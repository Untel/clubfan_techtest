import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4).maxLength(32),
    email: vine.string().trim().email().minLength(4).maxLength(256),
    password: vine.string().trim().minLength(8).maxLength(64),
    repeatPassword: vine.string().trim().minLength(8).maxLength(64),
  })
)

export const updateUserProfileValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4).maxLength(32),
    description: vine.string().trim().minLength(4).maxLength(256),
    profilePictureUrl: vine.string().trim()
  })
)
