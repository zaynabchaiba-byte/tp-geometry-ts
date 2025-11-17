import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";

export default class WktVisitor implements GeometryVisitor<void> {
    private buffer: string = "";

    getResult(): string {
        return this.buffer;
    }

    visitPoint(point: Point): void {
        if (point.isEmpty()) {
            this.buffer = "POINT EMPTY";
        } else {
            this.buffer = `POINT(${point.x()} ${point.y()})`;
        }
    }

    visitLineString(line: LineString): void {
        if (line.isEmpty()) {
            this.buffer = "LINESTRING EMPTY";
        } else {
            const coords: string[] = [];
            for (let i = 0; i < line.getNumPoints(); i++) {
                const c = line.getPointN(i).getCoordinate();
                coords.push(`${c[0]} ${c[1]}`);
            }
            this.buffer = `LINESTRING(${coords.join(",")})`;
        }
    }
}
