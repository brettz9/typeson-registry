    describe('indexedDB keys', function () {
        it('should allow valid indexedDB keys', function () {
            var typeson = new Typeson().register([require('../presets/indexedDBKey')]);
            var tson = typeson.stringify([Infinity, -Infinity, new Date(1234567)]);
            var back = typeson.parse(tson);
            expect(back[0]).to.equal(Infinity);
            expect(back[1]).to.equal(-Infinity);
            expect(back[2]).to.be.an.instanceOf(Date);
            expect(back[2].getTime()).to.equal(1234567);
        });
        it('should throw upon invalid indexedDB keys', function () {
            expect(function () {
                var typeson = new Typeson().register([require('../presets/indexedDBKey')]);
                var tson = typeson.stringify(true);
                console.log('tson', tson);
            }).to.throw();
            /*
            expect(function () {
                var cyclicArray = [];
                cyclicArray[0] = cyclicArray;
                var typeson = new Typeson().register([require('../presets/indexedDBKey')]);
                var tson = typeson.stringify(cyclicArray);
            }).to.throw();
            */
            expect(function () {
                var typeson = new Typeson().register([require('../presets/indexedDBKey')]);
                var tson = typeson.stringify(NaN);
            }).to.throw();
            expect(function () {
                var typeson = new Typeson().register([require('../presets/indexedDBKey')]);
                var tson = typeson.stringify(NaN);
            }).to.throw();
            expect(function () {
                var typeson = new Typeson().register([require('../presets/indexedDBKey')]);
                var tson = typeson.stringify(new Date(NaN));
            }).to.throw();
        });
    });
    // TODO: Could add a shimmed postMessage test though covered by worker test
    // TODO: Add test for socketio
