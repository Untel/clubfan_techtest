import vine from '@vinejs/vine'

export const feedValidator = vine.compile(
  vine.object({
    page: vine.number().positive().optional(),
    take: vine.number().positive().max(100).optional(),
    sort: vine.enum(['asc', 'desc'] as const).optional(),
  })
)
