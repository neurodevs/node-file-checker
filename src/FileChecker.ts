import { assertOptions } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { FileChecker } from './types'

export class FileCheckerImpl implements FileChecker {
    public static Class?: new () => FileChecker
    public static checkIntervalMs = 1000

    protected constructor() {}

    public static Checker() {
        return new (this.Class ?? this)()
    }

    public async checkWithTimeout(path: string, timeoutMs?: number) {
        assertOptions({ path }, ['path'])
        const startMs = Date.now()

        return await this._checkWithTimeout(startMs, path, timeoutMs)
    }

    private async _checkWithTimeout(
        startMs: number,
        path: string,
        timeoutMs: number | undefined
    ): Promise<boolean> {
        return await new Promise((resolve) => {
            const durationMs = Date.now() - startMs
            const wasFound = diskUtil.doesFileExist(path)

            if (wasFound || (timeoutMs && durationMs > timeoutMs)) {
                resolve(wasFound)
            } else {
                setTimeout(
                    () =>
                        this._checkWithTimeout(startMs, path, timeoutMs).then(
                            (wasFound) => resolve(wasFound)
                        ),
                    FileCheckerImpl.checkIntervalMs
                )
            }
        })
    }
}
