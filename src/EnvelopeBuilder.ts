import Coordinate from "./Coordinate";
import Envelope from "./Envelope";

export default interface EnvelopeBuilder{
insert(coordinate:Coordinate);
Buil():Envelope
}

