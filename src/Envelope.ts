import Coordinate from "./Coordinate";

export default class Envelope {
  private bottomLeft?: Coordinate;
  private topRight?: Coordinate;

constructor(bottomLeft?:Coordinate, topRight?:Coordinate) {
    this.bottomLeft = bottomLeft; this.topRight= topRight
};

isEmpty(): boolean {
    return this.bottomLeft.length==0 && this.topRight.length==0;  
    
    }
getXMin(): number {
    return this.bottomLeft[0];
  }

getYMin(): number {
    return this.bottomLeft[1];
  }

getXMax(): number {
    return this.topRight[0];
  }

getYMax(): number {
    return this.topRight[1];
  }
toString(): string {
    return 'Envelope[(${this.getXMin()}, ${this.getYMin()}), (${this.getXMax()}, ${this.getYMax()})]';
  }
}

