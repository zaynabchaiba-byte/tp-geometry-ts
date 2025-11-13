import Coordinate from "./Coordinate";
import Geometry from "./Geometry";
import Point from "./Point";



export default class LineString implements Geometry {
  private points: Point[];  
  constructor (points?: Point[]){
    this.points=points;
  }

  isEmpty(): boolean {
      return 
  }
  getType():string{
    return "LineString";
  }
    getNumPoints(): number{
    return this.points? this.points.length:0;
    }
    getPointN(n:number): Point{
        return this.points[n];

    }   
}