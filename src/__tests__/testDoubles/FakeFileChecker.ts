import { FileChecker, FileCheckerOptions } from '../../types'

export default class FakeFileChecker implements FileChecker {
    public static instance?: FakeFileChecker
    public static wasFileFound = true

    public lastPathChecked?: string
    public lastTimeout?: number

    public constructor(options?: FileCheckerOptions) {
        const { timeoutMs } = options ?? {}
        this.lastTimeout = timeoutMs
        FakeFileChecker.instance = this
    }

    public async checkIfFileExists(path: string) {
        this.lastPathChecked = path

        return FakeFileChecker.wasFileFound
    }
}
