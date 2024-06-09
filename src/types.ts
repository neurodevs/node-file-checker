export interface FileChecker {
    checkIfFileExists(path: string): Promise<boolean>
}

export type FileCheckerConstructor = new (
    options?: FileCheckerOptions
) => FileChecker

export interface FileCheckerOptions {
    timeoutMs?: number
    checkIntervalMs?: number
}
