import Point from "./Point";
import LineString from "./LineString";

export default interface GeometryVisitor<T> {
    visitPoint(point: Point): T;
    visitLineString(line: LineString): T;
}

