/* globals WebTransportError -- Newer API */
import {toStringTag} from 'typeson';

/**
 * @type {import('typeson').TypeSpecSet}
 */
const webtransporterror = {
    webtransporterror: {
        test (x) { return toStringTag(x) === 'WebTransportError'; },
        // Note that we can't support the `source` property (defaults
        //   to `stream` instead of `session`)
        replace ({
            message, streamErrorCode,
            cause, stack, fileName, lineNumber, columnNumber
        }) {
            return {
                message, streamErrorCode,
                cause, stack, fileName, lineNumber, columnNumber
            };
        },
        revive (obj) {
            const {message, streamErrorCode} = obj;
            // TS lib still models the older two-argument
            //   `(message, options)` form; browsers implement a single
            //   `init` object (which also carries `message`).
            const e = /**
                       * @type {{
                       *   name: string,
                       *   cause: Error,
                       *   stack: string,
                       *   fileName?: string,
                       *   lineNumber?: import('typeson').Integer,
                       *   columnNumber?: import('typeson').Integer
                       * }}
                       */ (
                    // @ts-expect-error - More recent API
                    new WebTransportError({message, streamErrorCode})
                );

            e.cause = obj.cause;
            e.stack = obj.stack;
            e.fileName = obj.fileName;
            e.lineNumber = obj.lineNumber;
            e.columnNumber = obj.columnNumber;

            return e;
        }
    }
};

export default webtransporterror;
