import Coordinate from "./Coordinate";
import Geometry from "./Geometry";
import Point from "./Point";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";

export default class LineString implements Geometry {
  private points: Point[];
  constructor(points?: Point[]) {
    this.points = points || [];
  }

translate(dx: number, dy: number){
    for(let point of this.points) {
      point.translate(dx, dy);
    }
  }

clone():LineString{
    const points=new Array<Point>;
    for(let point of this.points) {
      points.push(point.clone())
    }
    return new LineString(points);
  }

getEnvelope(): Envelope {
    const builder = new EnvelopeBuilder();
    for (const p of this.points) {
      builder.insert(p.getCoordinate());
    }
    return builder.Build();
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
