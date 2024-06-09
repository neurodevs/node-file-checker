import { FileChecker } from '../../types'

export default class FakeFileChecker implements FileChecker {
    public static instance?: FakeFileChecker
    public static wasFileFound = true

    public lastPathChecked?: string
    public lastTimeout?: number

    public constructor() {
        FakeFileChecker.instance = this
    }

    public async checkIfFileExists(path: string, timeoutMs?: number) {
        this.lastPathChecked = path
        this.lastTimeout = timeoutMs

        return FakeFileChecker.wasFileFound
    }
}
