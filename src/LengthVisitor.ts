import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";

export default class LengthVisitor implements GeometryVisitor<number> {
    visitPoint(point: Point): number {
        return 0.0;
    }

    visitLineString(line: LineString): number {
        let length = 0;
        for (let i = 1; i < line.getNumPoints(); i++) {
            const p1 = line.getPointN(i - 1).getCoordinate();
            const p2 = line.getPointN(i).getCoordinate();
            const dx = p2[0] - p1[0];
            const dy = p2[1] - p1[1];
            length += Math.sqrt(dx * dx + dy * dy);
        }
        return length;
    }
}
