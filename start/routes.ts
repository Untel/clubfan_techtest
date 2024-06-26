/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
const MediaController = () => import('#controllers/media_controller')

router.post('auth/signin', [AuthController, 'signin'])
router.post('auth/signup', [AuthController, 'signup'])

router.group(() => {
  router.get('user/:id', [UsersController, 'show'])
  router.get('auth/whoami', [AuthController, 'whoami'])
  router.patch('profile', [UsersController, 'update'])
  router.get('profile', [UsersController, 'show'])
  router.delete('profile', [UsersController, 'delete'])
  router.delete('media/:id', [MediaController, 'delete'])
  router.post('media', [MediaController, 'store'])
  router.post('media/:id/see', [MediaController, 'see'])
  router.get('user/follow/:target', [UsersController, 'follow'])
  router.get('feed', [MediaController, 'feed'])
}).middleware(middleware.auth())

// router.put('posts/:id', [UsersController, 'update'])
