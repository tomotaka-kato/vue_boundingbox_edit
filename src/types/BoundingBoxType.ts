import { BoundingBoxStatus} from '@/types/BoundingBoxStatus';

export default class BoundingBoxType {
    public id: number;


    public sX: number;
    public sY: number;
    public eX: number;
    public eY: number;

    public isSelected: BoundingBoxStatus = BoundingBoxStatus.NotSelected;

    constructor(sX: number, sY: number, eX: number, eY: number) {
        this.id = sX + sY + eX + eY;
        this.sX = sX;
        this.sY = sY;
        this.eX = eX;
        this.eY = eY;
    }

    public updatePosition(dx: number, dy: number) {
        this.sX += dx;
        this.sY += dy;
        this.eX += dx;
        this.eY += dy;
    }
}

