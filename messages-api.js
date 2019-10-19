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
    if (req.body.text) {
        console.log(req.body)
        res.json({
            message: "We received your request body!",
        })
    }
    else {
        res.send(400).end()
    }

})
