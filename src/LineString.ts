import AbstractGeometry from "./AbstractGeometry";
import Point from "./Point";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";
import GeometryVisitor from "./GeometryVisitor";
import Geometry from "./Geometry";

export default class LineString extends AbstractGeometry {
  private points: Point[];

  constructor(points?: Point[]) {
    super();
    this.points = points || [];
  }

  translate(dx: number, dy: number) {
    for (const point of this.points) {
      point.translate(dx, dy);
    }
  }

  clone(): LineString {
    const pointsCopy = this.points.map(p => p.clone());
    return new LineString(pointsCopy);
  }

  getEnvelope(): Envelope {
    const builder = new EnvelopeBuilder();
    this.accept(builder);
    return builder.build();
  }

  accept<T>(visitor: GeometryVisitor<T>): T {
    return visitor.visitLineString(this);
  }

  isEmpty(): boolean {
    return this.points.length == 0;
  }

  getType(): string {
    return "LineString";
  }

  getNumPoints(): number {
    return this.points.length;
  }

  getPointN(n: number): Point {
    return this.points[n];
  }
}
