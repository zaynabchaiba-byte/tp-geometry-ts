import Geometry from "./Geometry";
import Point from "./Point";
import LineString from "./LineString";
import Coordinate from "./Coordinate";


export default class WktWriter {
    write(geometry: Geometry): string {
        if (geometry instanceof Point) {
            if ( geometry.isEmpty() ){
                return "POINT EMPTY";
            }

            const type = "POINT(";
            const x = geometry.x();
            const y = geometry.y();

            return type + x + " " + y + ")";
        } else if (geometry instanceof LineString) {
            if ( geometry.isEmpty() ){
                return "LINESTRING EMPTY";
            }
            let liste = [];
            for (let i = 0; i < geometry.getNumPoints(); i++) {
                const c = geometry.getPointN(i).getCoordinate();
                const x = c[0];
                const y = c[1];
                liste.push(x+' '+y);
            }
            return "LINESTRING("+liste.join(',')+")";
        }
    }
}
