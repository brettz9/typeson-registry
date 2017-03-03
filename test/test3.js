function BuiltIn (preset) {
    describe('undefined type', function () {
        it('should be possible to restore `undefined` properties', function() {
Object.defineProperty(Object.prototype, '50', {configurable: true, get: function () {console.log('no twos' + this['_50']);return this['_50']}, set: function (v) {this['_50'] = v;}});
            var typeson = new Typeson().register(
                preset || require('../types/undefined')
            );
            var arr = new Array(100);
            arr[0] = 3;
            arr[1] = null;
            arr[3] = undefined;
            var a = [undefined, {b: undefined, c: arr}];
console.dir('aaa');
            var json = typeson.stringify(a);
console.log('bbb', json);
// {"$":[],"$types":{"$":{"0":"undefined","1.b":"undefined","1.c.3":"undefined"}}}
// {"$":[null,{"b":null,"c":[3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}],"$types":{"$":{"0":"undefined","1.b":"undefined","1.c.3":"undefined"}}}

            var a2 = typeson.parse(json);
            expect(a2.length).to.equal(2);
            expect(a2[0]).to.equal(undefined);
            expect(a2[1].b).to.equal(undefined);
            expect(a2[1].c[1]).to.not.equal(undefined);
            expect(a2[1].c[3]).to.equal(undefined);

            expect('0' in a2).to.be.true;
            expect('b' in a2[1]).to.be.true;
            expect('1' in a2[1].c).to.be.true;
            expect('3' in a2[1].c).to.be.true;

            if (preset) { // Includes sparse-undefined preset too
                expect(a2[1].c[2]).to.equal(undefined);
                expect('2' in a2[1].c).to.be.false;
            } else {
                expect(a2[1].c[2]).to.not.equal(undefined);
                expect('2' in a2[1].c).to.be.true;
            }
        });
        it('should be possible to restore `undefined` at root', function() {
            var typeson = new Typeson().register(
                preset || require('../types/undefined')
            );
            var tson = typeson.stringify(undefined);
            expect(tson).to.equal('{"$":null,"$types":{"$":{"":"undefined"}}}');
            var back = typeson.parse(tson);
            expect(back).to.be.undefined;
        });
    });
}

describe('Built-in', BuiltIn);

