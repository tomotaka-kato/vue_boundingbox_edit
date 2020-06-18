export default class BoundingBoxType {
    public sX: number;
    public sY: number;
    public eX: number;
    public eY: number;

    constructor(sX: number, sY: number, eX: number, eY: number) {
        this.sX = sX;
        this.sY = sY;
        this.eX = eX;
        this.eY = eY;
    }
}

