/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

const UserController = () => import('#controllers/users_controller')
// const UserValidator = () => import('#validators/user')

router.post('user', [UserController, 'store'])
// router.put('posts/:id', [UsersController, 'update'])
