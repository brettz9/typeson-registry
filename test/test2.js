var Typeson = require('typeson');var preset;
// Object.defineProperty(Object.prototype, '50', {configurable: true, get: function () {throw new Error('no fifties');}});
function expect (arg, msg) {
    if (!arg) {
        console.log('failed', msg || 'no msg');
    }
}
Object.defineProperty(Object.prototype, '0', {configurable: true, get: function () {throw new Error('no twos');}});
var a = [];
a[0] = 5;
a[0] = 45;

            var typeson = new Typeson().register(
                preset || {undefined: [
                    function (x, stateObj) { return typeof x === 'undefined' && (stateObj.ownKeys || !('ownKeys' in stateObj)); },
                    function (n) { return null; },
                    function (s) { return new Typeson.Undefined();} // Will add `undefined` (returning `undefined` would instead avoid explicitly setting)
                ]}
            );
            // var a = [undefined, {b: undefined, c: [3, null, , undefined]}];
            var arr = new Array(100);
            arr[0] = [3];
            arr[1] = null;
            arr[3] = undefined;
            var a = [undefined, {b: undefined, c: arr}];
            var json = typeson.stringify(a);
console.log('+++end test typeson.stringify');
            var a2 = typeson.parse(json);
            expect(a2.length === 2);
            expect(a2[0] === undefined);
            expect(a2[1].b === undefined);
            expect(a2[1].c[1] !== undefined);
            expect(a2[1].c[3] === undefined);

            expect('0' in a2);
            expect('b' in a2[1]);
            expect('1' in a2[1].c);
            expect('3' in a2[1].c);

            if (preset) { // Includes sparse-undefined preset too
                expect(a2[1].c[2] === undefined);
                expect(!('2' in a2[1].c));
            } else {
                expect(a2[1].c[2] !== undefined);
                expect('2' in a2[1].c);
            }
        
            var typeson = new Typeson().register(
                preset || require('../types/undefined')
            );
            var tson = typeson.stringify(undefined);
            expect(tson === '{"$":null,"$types":{"$":{"":"undefined"}}}');
            var back = typeson.parse(tson);
            expect(back === undefined);
console.log('testing done');