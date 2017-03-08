var Typeson = require('typeson');
exports.File = require('./file').File;
exports.FileList = {
    test: function (x) { return Typeson.toStringTag(x) === 'FileList'; },
    replace: function (fl) {
        var arr = [];
        for (var i = 0; i < fl.length; i++) {
            arr[i] = fl.item(i);
        }
        return arr;
    },
    revive: function (o) {
        function FileList () {
            this._files = arguments[0];
            this.length = this._files.length;
        }
        FileList.prototype.item = function (index) {
            return this._files[index];
        };
        if (typeof Symbol !== 'undefined') {
            FileList.prototype[Symbol.toStringTag] = 'FileList';
        } else {
            FileList.prototype.toString = function () {
                return '[object FileList]';
            };
        }
        return new FileList(o);
    }
};
