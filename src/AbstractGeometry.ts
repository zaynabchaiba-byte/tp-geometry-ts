import Geometry from "./Geometry";
import WktVisitor from "./WktVisitor";
import GeometryVisitor from "./GeometryVisitor";

export default abstract class AbstractGeometry implements Geometry {
    abstract getType(): string;
    abstract isEmpty(): boolean;
    abstract translate(dx: number, dy: number): void;
    abstract clone(): Geometry;
    abstract getEnvelope(): any;
    abstract accept<T>(visitor: GeometryVisitor<T>): T;

    asText(): string {
        const visitor = new WktVisitor();
        this.accept(visitor);
        return visitor.getResult();
    }
}
