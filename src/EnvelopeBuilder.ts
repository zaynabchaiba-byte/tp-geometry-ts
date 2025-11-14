import Coordinate from "./Coordinate";
import Envelope from "./Envelope";

export default class EnvelopeBuilder{
 xV:number[]=[];
 yV:number[]=[];

insert(coordinate:Coordinate){
 this.xV.push(coordinate[0]);
 this.yV.push(coordinate[1]);
}

Build():Envelope {
 const xMin = Math.min(...this.xV);
 const yMin = Math.min(...this.yV);
 const xMax = Math.max(...this.xV);
 const yMax = Math.max(...this.yV);  

 return new Envelope([xMin, yMin], [xMax, yMax]);
}


}

