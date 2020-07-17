import { GraphNode } from './GraphNode';

export class Graph {

    private nodes = new Map<string, GraphNode>();
    private adjacencyList = new Map<GraphNode, GraphNode[]>();

    constructor(graphData: any) {

        graphData.forEach((element: Object) => {
            let node = Object.keys(element)[0];
            this.addNode(node);
        });

        graphData.forEach((element: Object) => {
            let neighbours = Object.values(element)[0];
            let node = Object.keys(element)[0];
            neighbours.forEach((neighbour: string) => {
                this.addEdge(node, neighbour.toString());
            })
        });
    }

    public addNode(lable: string) {
        let node = new GraphNode(lable);
        this.nodes.set(lable, node);
        this.adjacencyList.set(node, new Array<GraphNode>());
    }

    public addEdge(from: string, to: string) {

        let fromNode = this.nodes.get(from);
        if (fromNode === undefined) {
            throw new Error("Illegal argument");
        }

        let toNode = this.nodes.get(to);
        if (toNode === undefined) {
            throw new Error("Illegal argument");
        }

        this.adjacencyList.get(fromNode)?.push(toNode);

    }

    

}
