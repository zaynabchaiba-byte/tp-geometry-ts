import Geometry from "./Geometry";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";
import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";


export default class GeometryCollection implements Geometry {
    private geometries: Geometry[];

    constructor(geometries?: Geometry[]) {
        this.geometries = geometries || [];
    }

    getType(): string {
        return "GeometryCollection";
    }

    isEmpty(): boolean {
        return this.geometries.length === 0 || this.geometries.every(g => g.isEmpty());
    }

    translate(dx: number, dy: number): void {
        for (const g of this.geometries) {
            g.translate(dx, dy);
        }
    }

    clone(): Geometry {
        const cloned = this.geometries.map(g => g.clone());
        return new GeometryCollection(cloned);

    }

    getEnvelope(): Envelope {
        const builder = new EnvelopeBuilder();
        for (const g of this.geometries) {
            const env = g.getEnvelope();
            if (!env.isEmpty()) {
                builder.visitPoint(new Point([env.getXMin(), env.getYMin()]));
                builder.visitPoint(new Point([env.getXMax(), env.getYMax()]));
            }
        }
        return builder.build();
    }

    accept<T>(visitor: GeometryVisitor<T>): T {
        let result: any;
        for (const g of this.geometries) {
            result = g.accept(visitor);
        }
        return result;
    }

    asText(): string {
        if (this.isEmpty()) return "GEOMETRYCOLLECTION EMPTY";
        return `GEOMETRYCOLLECTION(${this.geometries.map(g => g.asText()).join(",")})`;
    }


    getNumGeometries(): number {
        return this.geometries.length;
    }

    getGeometryN(n: number): Geometry {
        return this.geometries[n];
    }
}
