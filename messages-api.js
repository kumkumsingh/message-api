const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const urlencodedparser = bodyParser.urlencoded({ extended: false })
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`listen to port no ${port}`))

app.post('/messages', urlencodedparser, (req, res) => {

    // message = req.body
    if (!req.body) {

        res.status(400).end();
    }
    console.log(req.body)
    res.json({ "message": "Message received loud and clear" })
})