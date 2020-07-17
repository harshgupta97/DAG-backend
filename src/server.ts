import App from './App'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import GraphController from './controllers/GraphController'

const app = new App({
    port: 5000,
    controllers: [
        new GraphController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()
