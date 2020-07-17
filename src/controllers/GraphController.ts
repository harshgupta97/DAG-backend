import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'

class GraphController implements IControllerBase {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/path', this.index)
    }

    index = (req: Request, res: Response) => {
        res.status(200).send(req);
    }


}

export default GraphController
