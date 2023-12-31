const routes = require("express").Router();

const authMiddleware = require("./middleware/auth");

const SessionController = require('./controllers/SessionController');
// const { User } = require('./models');

routes.post('/sessions', SessionController.store)


routes.use(authMiddleware);
routes.get('/dashboard', (req, res) => {
    return res.status(200).send()
});

module.exports = routes;