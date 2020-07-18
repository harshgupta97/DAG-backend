import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import { Graph } from "../utilities/Graph";

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
        
        if(req.body.graph === undefined)
        return res.status(400).send("There is no graph object");

        if(req.body.node === undefined)
        return res.status(400).send("Please select the source node");

        let graphMap = new Graph(req.body.graph);
        if (graphMap.hasCycle())
            return res.status(400).send("The given graph is not acyclic")
        let paths = graphMap.findAllPathSource(req.body.node.toString());
        return res.status(200).send(paths);
    }


}

export default GraphController
