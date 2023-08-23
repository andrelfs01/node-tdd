const routes = require("express").Router();

const SessionController = require('./controllers/SessionController');
// const { User } = require('./models');

// User.create({
//     name: "andre",
//     email: "email@gmail.com",
//     password_hash: "asdasdasd"
// });

routes.post('/sessions', SessionController.store)

module.exports = routes;