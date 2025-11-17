import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";
import EnvelopeBuilder from "../src/EnvelopeBuilder";
import WktWriter from "../src/WktWriter";
import LogGeometryVisitor from "../src/LogGeometryVisitor";
import GeometryWithCachedEnvelope from "../src/GeometryWithCachedEnvelope.ts";
import GeometryCollection from "../src/GeometryCollection";
import LengthVisitor from "../src/LengthVisitor";
import Envelope from "../src/Envelope";

describe("test Point", () => {

    it("test default constructor", () => {
        const p = new Point();
        expect(p.getCoordinate()).to.deep.equal([]);
        expect(Number.isNaN(p.x())).to.be.true;
        expect(Number.isNaN(p.y())).to.be.true;
        expect(p.isEmpty()).to.be.true;
        expect(p.getType()).to.equal("Point");
    });

    it("test constructor with coordinates", () => {
        const p = new Point([3.0, 4.0]);
        expect(p.getCoordinate()).to.deep.equal([3.0, 4.0]);
        expect(p.x()).to.equal(3.0);
        expect(p.y()).to.equal(4.0);
    });

    it("test translate point", () => {
        const p = new Point([3.0, 4.0]);
        p.translate(1.0, 2.0);
        expect(p.getCoordinate()).to.deep.equal([4.0, 6.0]);
    });

    it("test clone point", () => {
        const p = new Point([3.0, 4.0]);
        const clone = p.clone();
        expect(clone.getCoordinate()).to.deep.equal([3.0, 4.0]);
        expect(clone).not.to.equal(p);
    });

    it("test envelopeBuilder", () => {
        const p = new Point([2.0, 3.0]);
        const builder = new EnvelopeBuilder();
        p.accept(builder);
        const env = builder.build();
        expect(env.getXMin()).to.equal(2.0);
        expect(env.getYMin()).to.equal(3.0);
        expect(env.getXMax()).to.equal(2.0);
        expect(env.getYMax()).to.equal(3.0);
    });

    it("test envelopeBuilder empty", () => {
        const p = new Point();
        const builder = new EnvelopeBuilder();
        p.accept(builder);
        const env = builder.build();
        expect(env.isEmpty()).to.be.true;
    });

    it("test empty envelope class", () => {
        const env = new Envelope();
        expect(env.isEmpty()).to.be.true;
    });

    it("test wkt empty", () => {
        const g = new Point();
        const writer = new WktWriter();
        const wkt = writer.write(g);
        expect(wkt).to.equal("POINT EMPTY");
    });

    it("test wkt", () => {
        const g = new Point([3.0, 4.0]);
        const writer = new WktWriter();
        const wkt = writer.write(g);
        expect(wkt).to.equal("POINT(3 4)");
    });

    it("test LogGeometryVisitor", () => {
        const messages: string[] = [];
        const oldLog = console.log;
        console.log = (msg: string) => messages.push(msg);

        const p = new Point([2.0, 3.0]);
        p.accept(new LogGeometryVisitor());

        expect(messages[0]).to.equal("Je suis un point avec x=2 et y=3.");
        console.log = oldLog;
    });

    it("test LogGeometryVisitor empty point", () => {
        const messages: string[] = [];
        const oldLog = console.log;
        console.log = (msg: string) => messages.push(msg);

        const p = new Point();
        p.accept(new LogGeometryVisitor());

        expect(messages[0]).to.equal("Je suis un point vide.");
        console.log = oldLog;
    });

    it("test asText", () => {
        const p = new Point([2.0, 3.0]);
        expect(p.asText()).to.equal("POINT(2 3)");
    });


    it("test GeometryWithCachedEnvelope on Point", () => {
        const p = new Point([1, 2]);
        const decorated = new GeometryWithCachedEnvelope(p);

        const env1 = decorated.getEnvelope();
        const env2 = decorated.getEnvelope();
        expect(env1).to.equal(env2);

        decorated.translate(1, 1);
        const env3 = decorated.getEnvelope();
        expect(env3).to.not.equal(env1);

        expect(decorated.getType()).to.equal("Point");
        expect(decorated.asText()).to.equal("POINT(2 3)");
    });

    it("test GeometryWithCachedEnvelope on empty Point", () => {
        const p = new Point();
        const decorated = new GeometryWithCachedEnvelope(p);

        const env = decorated.getEnvelope();
        expect(env.isEmpty()).to.be.true;

        decorated.translate(1, 1);
        expect(decorated.getEnvelope().isEmpty()).to.be.true;
    });

      it("test GeometryWithCachedEnvelope LogGeometryVisitor", () => {
    const p = new Point([5, 6]);
    const decorated = new GeometryWithCachedEnvelope(p);

    const messages: string[] = [];
    const oldLog = console.log;
    console.log = (msg: string) => messages.push(msg); 

    const visitor = new LogGeometryVisitor();
    decorated.accept(visitor);

    console.log = oldLog; 
    

    expect(messages[0]).to.equal("Je suis un point avec x=5 et y=6."); 
    });

    it("test GeometryCollection with multiple Points", () => {
        const p1 = new Point([1, 2]);
        const p2 = new Point([3, 4]);
        const collection = new GeometryCollection([p1, p2]);

        expect(collection.getNumGeometries()).to.equal(2);
        expect(collection.getGeometryN(0)).to.equal(p1);
        expect(collection.getGeometryN(1)).to.equal(p2);
        expect(collection.isEmpty()).to.be.false;

        const env = collection.getEnvelope();
        expect(env.getXMin()).to.equal(1);
        expect(env.getXMax()).to.equal(3);
        expect(env.getYMin()).to.equal(2);
        expect(env.getYMax()).to.equal(4);
    });

    it("test GeometryCollection translate", () => {
        const p1 = new Point([1, 2]);
        const p2 = new Point([3, 4]);
        const collection = new GeometryCollection([p1, p2]);

        collection.translate(2, 3);
        expect(p1.getCoordinate()).to.deep.equal([3, 5]);
        expect(p2.getCoordinate()).to.deep.equal([5, 7]);
    });

    it("test GeometryCollection clone", () => {
        const p1 = new Point([1, 2]);
        const p2 = new Point([3, 4]);
        const collection = new GeometryCollection([p1, p2]);


        const clone = collection.clone() as GeometryCollection;

        expect(clone).not.to.equal(collection);
        expect((clone.getGeometryN(0) as Point).getCoordinate()).to.deep.equal([1, 2]);
        expect((clone.getGeometryN(1) as Point).getCoordinate()).to.deep.equal([3, 4]);

        collection.translate(1, 1);
        expect((clone.getGeometryN(0) as Point).getCoordinate()).to.deep.equal([1, 2]);
    });

    it("test GeometryCollection empty", () => {
        const gc = new GeometryCollection([]);
        expect(gc.isEmpty()).to.be.true;
        expect(gc.getEnvelope().isEmpty()).to.be.true;
    });

    it("test LengthVisitor on LineString", () => {
        const line = new LineString([new Point([0, 0]), new Point([3, 4])]);
        const length = line.accept(new LengthVisitor());
        expect(length).to.equal(5.0);
    });

    it("test LengthVisitor on Point", () => {
        const length = new Point([10, 20]).accept(new LengthVisitor());
        expect(length).to.equal(0);
    });


    it("test envelope toString non empty", () => {
        const env = new Envelope([1, 2], [3, 4]);
        expect(env.toString()).to.equal("Envelope[(1, 2), (3, 4)]");
    });

    it("test expandToInclude", () => {
        const env = new Envelope([2, 2], [4, 4]);
        env.expandToInclude(1, 5);
        expect(env.getXMin()).to.equal(1);
        expect(env.getYMax()).to.equal(5);
    });

    it("test expandToInclude on empty envelope", () => {
        const env = new Envelope();
        env.expandToInclude(3, 4);
        expect(env.getXMin()).to.equal(3);
        expect(env.getXMax()).to.equal(3);
        expect(env.getYMin()).to.equal(4);
        expect(env.getYMax()).to.equal(4);
    });

    it("test expandToInclude interior point", () => {
        const env = new Envelope([1, 1], [5, 5]);
        env.expandToInclude(3, 3);
        expect(env.getXMin()).to.equal(1);
        expect(env.getXMax()).to.equal(5);
        expect(env.getYMin()).to.equal(1);
        expect(env.getYMax()).to.equal(5);
    });

});
