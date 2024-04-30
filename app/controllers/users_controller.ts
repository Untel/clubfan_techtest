import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/users'

export default class UsersController {
  async index({}: HttpContext) {
    // return list of posts
  }

  async store({}: HttpContext) {
    // save post
  }

  async show({}: HttpContext) {
    // return post by id
  }
}
