const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
let count = 1

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`listen to port no ${port}`))

const loggingMessage = (req, res, next) => {
    const msg = req.body.message
    if (msg) {
        if (count > 5) {
            res.status(429).send("Sorry !!! Too Many Requests")
        } else {
            count++;
            console.log(msg)
            res.json({
                message: "We received your request body!"
            })
        }
    }
    else {
        res.status(400).send("Sorry to bad").end()
    }

}
//http POST :3000/messages message=message6
app.post('/messages', loggingMessage)
