export interface FileChecker {
    checkIfFileExists(path: string): Promise<boolean>
}
