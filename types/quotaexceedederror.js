import {toStringTag} from 'typeson';

/**
 * @type {import('typeson').TypeSpecSet}
 */
const quotaexceedederror = {
    quotaexceedederror: {
        test (x) { return toStringTag(x) === 'QuotaExceededError'; },
        replace ({
            message, quota, requested,
            cause, stack, fileName, lineNumber, columnNumber
        }) {
            return {
                message, quota, requested,
                cause, stack, fileName, lineNumber, columnNumber
            };
        },
        revive (obj) {
            const {message, quota, requested} = obj;

            /** @type {{quota?: number, requested?: number}} */
            const options = {};
            if (quota !== null && quota !== undefined) {
                options.quota = quota;
            }
            if (requested !== null && requested !== undefined) {
                options.requested = requested;
            }
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
                    new QuotaExceededError(message, options)
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

export default quotaexceedederror;
