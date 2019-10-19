const express = require('express')
const { Router } = express
const router = new Router()
const bodyParser = require('body-parser')
const Movies = require('./sequelize-rest')

const jsonParser = bodyParser.json()
const app = express()
app.use(jsonParser)
const port = process.env.PORT || 4000
router.get('/Movies', (request, response, next) => {
    // http ':4000/route?limit=2&offset=0'
    const limit = request.query.limit || 3
    const offset = request.query.offset || 0
    if (limit && offset) {
    Movies.findAndCountAll({ limit, offset })
            .then(result => response.send({ Data: result.rows, total: result.count }))
    }
    Movies.findAll()
        .then(movies => response.send(movies))
        .catch(err => next(err))
})
router.get('/movie/:id', (request, response, next) => {
    Movies.findByPk(request.params.id)
        .then(movie => response.send(movie))
        .catch(err => next(err))

})
router.put('/movie/:id', (request, response, next) => {
    Movies.findByPk(request.params.id)
        .then(movie => {
            if (movie) {
                return movie.update(request.body)
        .then(movie => { response.send(movie) })
            }
        })
        .catch(err => next(err))
})
router.delete('/movie/:id', (request, response, next) => {
    Movies.destroy({
        where: {
            id: request.params.id,
        }
    })
        .then(numDeleted => {
            if (numDeleted) {
                response.status(204).end();
            } else {
                response.status(404).end();
            }
        })
        .catch(next);
})

app
    //.use(jsonParser)
    .use(router)
    .listen(port, () => console.log(`listen to my port ${port}`))