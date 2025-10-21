import { assertOptions } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import {
    FileChecker,
    FileCheckerConstructor,
    FileCheckerOptions,
} from '../types'

export default class FileCheckerImpl implements FileChecker {
    public static Class?: FileCheckerConstructor

    private readonly checkIntervalMs: number
    private readonly timeoutMs?: number

    protected constructor(options?: FileCheckerOptions) {
        const { timeoutMs, checkIntervalMs = 1000 } = options ?? {}

        this.timeoutMs = timeoutMs
        this.checkIntervalMs = checkIntervalMs
    }

    public static Checker(options?: FileCheckerOptions) {
        return new (this.Class ?? this)(options)
    }

    public async checkIfFileExists(path: string) {
        assertOptions({ path }, ['path'])
        const startMs = Date.now()

        return await this._checkIfFileExists(startMs, path)
    }

    private async _checkIfFileExists(
        startMs: number,
        path: string
    ): Promise<boolean> {
        return await new Promise((resolve) => {
            const wasFound = diskUtil.doesFileExist(path)

            if (wasFound || this.isTimedOut(startMs)) {
                resolve(wasFound)
            } else {
                setTimeout(
                    () =>
                        this._checkIfFileExists(startMs, path).then(
                            (wasFound) => resolve(wasFound)
                        ),
                    this.checkIntervalMs
                )
            }
        })
    }

    private isTimedOut(startMs: number) {
        const durationMs = Date.now() - startMs
        return this.timeoutMs && durationMs > this.timeoutMs
    }
}
