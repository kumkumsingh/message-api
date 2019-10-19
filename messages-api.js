const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const urlencodedparser = bodyParser.urlencoded({ extended: false })
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`listen to port no ${port}`))

app.post('/messages', (req, res) => {
    const msg = req.body.message
    if (msg) {
        for (let i = 1; i <= 5; i++) {
            console.log(msg)
        }
        res.json({
            message: "We received your request body!",
        })
    }
    else {
        res.send(400).end()
    }

})
