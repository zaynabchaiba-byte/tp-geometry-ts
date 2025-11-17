import AbstractGeometry from "./AbstractGeometry";
import Coordinate from "./Coordinate";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";
import GeometryVisitor from "./GeometryVisitor";

export default class Point extends AbstractGeometry {
  private coordinate?: Coordinate;

  constructor(coordinate?: Coordinate) {
    super();
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
    if (!this.isEmpty()) {
      this.coordinate[0] += dx;
      this.coordinate[1] += dy;
    }
  }

  clone(): Point {
    return new Point([...this.coordinate]);
  }

  getEnvelope(): Envelope {
    const builder = new EnvelopeBuilder();
    this.accept(builder);
    return builder.build();
  }

  accept<T>(visitor: GeometryVisitor<T>): T {
    return visitor.visitPoint(this);
  }

  x(): number {
    return this.coordinate.length > 0 ? this.coordinate[0] : Number.NaN;
  }

  y(): number {
    return this.coordinate.length > 1 ? this.coordinate[1] : Number.NaN;
  }
}
