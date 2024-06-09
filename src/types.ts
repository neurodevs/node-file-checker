export interface FileChecker {
    checkWithTimeout(path: string): Promise<boolean>
}
