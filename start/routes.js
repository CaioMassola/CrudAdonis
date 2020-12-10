'use strict'

const UserController = require('../app/Controllers/Http/UserController');

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Rota Usuarios
Route.post('/criar', 'UserController.create');
Route.get('/obter', 'UserController.read');
Route.get('/obter/:id', 'UserController.readById');
Route.put('/update/:id', 'UserController.update');
Route.delete('/deletar/:id', 'UserController.delete');

//Rota auth
Route.post('/auth', 'UserController.login');
Route.get('/app', 'AppController.index').middleware(['auth']);

Route.on('/').render('welcome')