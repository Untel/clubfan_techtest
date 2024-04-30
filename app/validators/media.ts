import vine from '@vinejs/vine'

export const createMediaValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(4).maxLength(200).optional(),
    description: vine.string().minLength(4).maxLength(2000).optional(),
    url: vine.string().url()
  })
)
