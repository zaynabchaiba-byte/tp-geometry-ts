import Coordinate from "./Coordinate";

export default class Envelope {
  private bottomLeft?: Coordinate;
  private topRight?: Coordinate;

  constructor(bottomLeft?: Coordinate, topRight?: Coordinate) {
    this.bottomLeft = bottomLeft;
    this.topRight = topRight;
  }

  isEmpty(): boolean {
    return (
      this.bottomLeft === undefined ||
      this.topRight === undefined
    );
  }

  expandToInclude(x: number, y: number): void {
    if (this.isEmpty()) {
      this.bottomLeft = [x, y];
      this.topRight = [x, y];
    } else {
      this.bottomLeft = [
        Math.min(this.bottomLeft![0], x),
        Math.min(this.bottomLeft![1], y),
      ];

      this.topRight = [
        Math.max(this.topRight![0], x),
        Math.max(this.topRight![1], y),
      ];
    }
  }

  getXMin(): number {
    return this.bottomLeft![0];
  }

  getYMin(): number {
    return this.bottomLeft![1];
  }

  getXMax(): number {
    return this.topRight![0];
  }

  getYMax(): number {
    return this.topRight![1];
  }

  toString(): string {
    return `Envelope[(${this.getXMin()}, ${this.getYMin()}), (${this.getXMax()}, ${this.getYMax()})]`;
  }
}
