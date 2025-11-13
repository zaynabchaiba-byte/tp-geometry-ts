import Coordinate from "./Coordinate";
import Geometry from "./Geometry";


export default class Point implements Geometry {
  private coordinate?: Coordinate;

  constructor(coordinate?: Coordinate) {
    this.coordinate = coordinate || [];
  }

  getType(): string {
    return "Point";
  }

  isEmpty(): boolean {
    return this.coordinate.length == 0;
  }

  getCoordinate(): Coordinate {
    return this.coordinate;
  }

  translate(dx: number, dy: number) {
    if (this.isEmpty()) {
      return;
    }
    this.coordinate[0] += dx;
    this.coordinate[1] += dy;
  }

  clone():Point{
    return new Point([...this.coordinate]);
  }

  x(): number {
    return this.coordinate.length > 0 ? this.coordinate[0] : Number.NaN;
  }

  y(): number {
    return this.coordinate.length > 1 ? this.coordinate[1] : Number.NaN;
  }

}
