export class GraphNode {
    private _lable: string;

    constructor(label: string) {
        this._lable = label;
    }


    public get lable(): string {
        return this._lable;
    }

}