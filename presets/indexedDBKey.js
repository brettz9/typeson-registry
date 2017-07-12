module.exports = [
    // Numbers (but not NaN), Date (but not NaN value), Strings,
    //  Array Buffer, DataView, Typed Arrays, Arrays (but not
    //  cyclic or non-valid key items)
    {checkInvalidOtherPrimitiveKeys: [function (val) {
        // We do not include 'object' below as valid object types should have already
        //   been detected by the time this first-in-last-run check is done
        if (!['number', 'string'].includes(typeof val)) {
            throw new TypeError('An indexedDB key must be a number, string, date, array, or array buffer or view on a buffer (e.g., DataView or TypedArrays)');
        }
    }]},
    require('../types/Infinity'),
    require('../types/NegativeInfinity'),
    require('../types/Date'),
    require('../types/dataview'),
    require('../types/arraybuffer'),
    require('../types/typed-arrays'),
    {checkInvalidNumberAndObjectKeys: [function (val) {
        if (typeof val === 'number' && isNaN(val)) {
            throw new TypeError('An indexedDB key cannot be `NaN`');
        }
        if (Typeson.toStringTag(val) === 'Date' && isNaN(val.getTime())) {
            throw new TypeError('An indexedDB key cannot be an invalid Date');
        }
        // Cyclic arrays are not valid but will automatically throw upon
        //  JSON.stringify attempts (as long as the user doesn't set the
        //  option in Typeson to encode cyclics); array items that are invalid
        //  as keys will also be detected as Typeson searches recursively
    }]}
];
