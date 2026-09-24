import date from '../types/date.js';
import arraybuffer from '../types/arraybuffer.js';

/**
 * @type {import('typeson').Preset}
 */
const indexeddbKey = [
    date,
    arraybuffer,
    {
        checkForExceptions: {
            test (val) {
                if (val) {
                    /*
                        Todo:
                        Array objects, where every item is defined, is itself a
                        valid key, and does not directly or indirectly contain
                        itself. This includes empty arrays. Arrays can contain
                        other arrays.
                    */

                    if (Number.isNaN(val)) {
                        throw new TypeError('NaN is not a valid indexedDB key');
                    }

                    const stringTag = {}.toString.call(val).slice(8, -1);
                    if (stringTag === 'SharedArrayBuffer') {
                        // todo: This needs to be confirmed per https://github.com/w3c/IndexedDB/issues/506
                        throw new TypeError(
                            'A SharedArrayBuffer is not a valid indexedDB key'
                        );
                    }
                    if (stringTag === 'Date' &&
                        Number.isNaN(val.getTime())
                    ) {
                        throw new TypeError(
                            'An invalid Date is not a valid indexedDB key'
                        );
                    }
                    // Has [[ViewedArrayBuffer]] internal slot
                    if (ArrayBuffer.isView(val)) {
                        const arrayBuffer = val.buffer;
                        if (arrayBuffer === undefined) {
                            /* eslint-disable @stylistic/max-len -- Long */
                            throw new TypeError(
                                'A buffer source with buffer undefined is not a valid indexedDB key.'
                            );
                            /* eslint-enable @stylistic/max-len -- Long */
                        }
                    }
                }

                return false;
            }
        }
    }
];

export default indexeddbKey;
