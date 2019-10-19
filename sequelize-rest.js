const Sequelize = require('sequelize')
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres';
const db = new Sequelize(databaseUrl);
const Movie = db.define('Movie', {
    name: { type: Sequelize.STRING },
    yearOfRelease: { type: Sequelize.INTEGER },
    synopsis: { type: Sequelize.STRING }
})
db
    .sync({ force: true })//{ force: true }
    .then(() => {
        console.log('logs a message confirming the database schema has been updated.')
        const movies = [{ name: 'SpiderMan', yearOfRelease: 2000, synopsis: 'ABCD' },
        { name: 'IronMan', yearOfRelease: 2005, synopsis: 'EFGH' },
        { name: 'Avengers', yearOfRelease: 2019, synopsis: 'IJKL' }]
        const moviePromises = movies.map((movie) => Movie.create(movie))
        return Promise.all(moviePromises)

    })
    .catch(err => console.error(err))


module.exports = Movie