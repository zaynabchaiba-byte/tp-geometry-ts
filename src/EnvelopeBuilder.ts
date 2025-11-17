import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";
import Envelope from "./Envelope";
import Coordinate from "./Coordinate";

export default class EnvelopeBuilder implements GeometryVisitor<void> {
    private xV: number[] = [];
    private yV: number[] = [];

    visitPoint(point: Point): void {
        if (!point.isEmpty()) {
            const c = point.getCoordinate();
            this.xV.push(c[0]);
            this.yV.push(c[1]);
        }
    }

    visitLineString(line: LineString): void {
        for (let i = 0; i < line.getNumPoints(); i++) {
            const c = line.getPointN(i).getCoordinate();
            this.xV.push(c[0]);
            this.yV.push(c[1]);
        }
    }

    build(): Envelope {
        if (this.xV.length === 0 || this.yV.length === 0) {
            return new Envelope();
        }
        const xMin = Math.min(...this.xV);
        const yMin = Math.min(...this.yV);
        const xMax = Math.max(...this.xV);
        const yMax = Math.max(...this.yV);
        return new Envelope([xMin, yMin], [xMax, yMax]);
    }
}
