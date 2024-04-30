import vine from '@vinejs/vine'

export const createMediaValidator = vine.compile(
  vine.object({
    url: vine.string().url()
  })
)
