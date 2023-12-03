/* globals navigator */
import {TypesonPromise, toStringTag} from 'typeson';

/**
 * @type {import('typeson').TypeSpecSet}
 */
const filesystemdirectoryhandle = {
    filesystemdirectoryhandle: {
        test (x) { return toStringTag(x) === 'FileSystemDirectoryHandle'; },
        replaceAsync (fsd) {
            return new TypesonPromise(async (resolve, reject) => {
                try {
                    resolve(await fsd.resolve());
                } catch (err) {
                    reject(err);
                }
            });
        },
        reviveAsync (fsdPaths) {
            return new TypesonPromise(async (resolve, reject) => {
                try {
                    const rootHandle = await navigator.storage.getDirectory();
                    let handle = rootHandle;
                    for (const path of fsdPaths) {
                        // eslint-disable-next-line no-await-in-loop -- Needed
                        handle = await handle.getDirectoryHandle(path);
                    }
                    resolve(handle);
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
};

export default filesystemdirectoryhandle;
