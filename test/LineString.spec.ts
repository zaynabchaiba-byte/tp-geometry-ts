import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from '../src/LineString'

describe("test LineString", () => {

    it("test default constructor", () => {
        const l = new LineString();
        expect(l.getNumPoints()).to.equal(0);
        expect(l.getType()).to.equal("LineString");
        expect(l.isEmpty()).to.be.true;
    });

    it("test constructor with coordinates", () => {
        const p1 = new Point([3.0, 4.0]);
        const p2 = new Point([2.0, 1.0]);
        const l = new LineString([p1, p2]);
        expect(l.getNumPoints()).to.equal(2);
        expect(l.getPointN(0)).to.equal(p1);
        expect(l.getPointN(1)).to.equal(p2);
        expect(l.isEmpty()).to.be.false;
    });

    it("test translate linestring", () => {
        const p1 = new Point([3.0, 4.0]);
        const p2 = new Point([1.0, 2.0]);
        const l = new LineString([p1, p2]);
        l.translate(1.0, 1.5)
        expect(l.getPointN(0).getCoordinate()).to.deep.equal([4.0, 5.5]);
        expect(l.getPointN(1).getCoordinate()).to.deep.equal([2.0, 3.5]);

        const l_vide = new LineString();
        l_vide.translate(1.0, 1.5);
        expect(l_vide.isEmpty()).to.be.true;

       

    });


});

