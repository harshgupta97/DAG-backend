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

    public traverse(root: string) {
        let rootNode = this.nodes.get(root);
        if (rootNode == undefined) {
            throw new Error("Illegal argument");
        }

        this.traverseDepthFirst(rootNode, new Set<GraphNode>());
    }

    private traverseDepthFirst(rootNode: GraphNode, visited: Set<GraphNode>) {

        console.log(rootNode.lable);
        visited.add(rootNode);

        // @ts-ignore
        this.adjacencyList.get(rootNode).forEach(element => {
            if (!visited.has(element)) {
                this.traverseDepthFirst(element, visited)
            }
        });
    }

    public findAllPathSource(source: string) {

        let rootNode = this.nodes.get(source);
        if (rootNode === undefined) {
            throw new Error("Illegal argument");
        }

        let pathQueue: GraphNode[][] = [];
        pathQueue.push([rootNode]);
        let allPaths: GraphNode[][] = [];

        while (pathQueue.length !== 0) {
            let currentPath: GraphNode[] | undefined = pathQueue.shift();
            // @ts-ignore
            let currentNode: GraphNode = currentPath[currentPath?.length - 1];

            if (this.adjacencyList.get(currentNode)?.length === 0) {
                allPaths.push(currentPath as GraphNode[])
            } else {
                this.adjacencyList.get(currentNode)?.forEach((element: GraphNode) => {
                    let newPath = new Array<GraphNode>();
                    newPath = [...currentPath as GraphNode[]];
                    newPath?.push(element);
                    pathQueue.push(newPath as GraphNode[]);
                })
            }


        }

        return Graph.formatPathObject(allPaths);

    }

    private static formatPathObject(paths: GraphNode[][]) {
        return paths.map((path: GraphNode[]) => {
            return path.map((node: GraphNode) => {
                return node.lable;
            })
        });
    }

    public hasCycle() {
        const allNodes = new Set<string>();
        this.nodes.forEach((value: GraphNode, key: string) => allNodes.add(key));
        const visiting = new Set<string>();
        const visited = new Set<string>();

        while (allNodes.size !== 0) {
            console.log(allNodes)
            let node = allNodes.values().next().value;
            if (this.checkForCycle(node, allNodes, visiting, visited))
                return true
        }
        return false
    }

    private checkForCycle(node: string, all: Set<string>, visiting: Set<string>, visited: Set<string>) {
        all.delete(node);
        visiting.add(node);

        // @ts-ignore
        const neighbours: GraphNode[] = this.adjacencyList.get(this.nodes.get(node) as GraphNode);
        for (let i = 0; i < neighbours?.length; i++) {

            if (visited.has(neighbours[i].lable))
                continue;

            if (visiting.has(neighbours[i].lable))
                return true;

            if (this.checkForCycle(neighbours[i].lable, all, visiting, visited))
                return true;
        }

        visiting.delete(node);
        visited.add(node);
        return false;
    }

}
