import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractSpruceTest from '@sprucelabs/test-utils'
import FileCheckerImpl from '../../FileChecker'

export default class FileCheckerTest extends AbstractSpruceTest {
    private static fileChecker: FileCheckerImpl
    protected static async beforeEach() {
        await super.beforeEach()
        this.fileChecker = FileCheckerImpl.Checker() as FileCheckerImpl
        FileCheckerImpl.checkIntervalMs = 10
    }

    @test()
    protected static async checkWithTimeoutThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            // @ts-ignore
            this.fileChecker.checkIfFileExists()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['path'],
        })
    }

    @test()
    protected static async canCallCheckWithRequired() {
        const destination = this.writeToFile('test.txt')
        await this.checkWithTimeout(destination)
    }

    @test('waits for file with delay 1 ms', 1)
    @test('waits for file with delay 500 ms', 500)
    protected static async waitsUntilFileIsCreated(delayMs: number) {
        let wasHit = false
        let wasFound = false
        const destination = this.generateFilePath('test.txt')

        void this.checkWithTimeout(destination).then((found) => {
            wasHit = true
            wasFound = found
        })

        await this.wait(delayMs)

        assert.isFalse(wasHit, 'Was hit but should not have been!')

        this.writeRandomContent(destination)
        await this.wait(FileCheckerImpl.checkIntervalMs + 1)

        assert.isTrue(wasHit, 'Was not hit but should have been!')
        assert.isTrue(wasFound, 'checkWithTimeout should have returned true!')
    }

    @test('can timeout with 100ms', 100)
    @test('can timeout with 200ms', 200)
    protected static async timesOutAfterDuration(timeoutMs: number) {
        const now = Date.now()
        const wasFound = await this.checkWithTimeout(
            'does-not-exist.txt',
            timeoutMs
        )
        const duration = Date.now() - now
        assert.isAbove(duration, timeoutMs * 0.8)
        assert.isBelow(duration, timeoutMs * 1.2)
        assert.isFalse(wasFound, 'checkWithTimeout should have returned false!')
    }

    private static async checkWithTimeout(
        destination: string,
        timeoutMs?: number
    ) {
        return await this.fileChecker.checkIfFileExists(destination, timeoutMs)
    }

    private static writeToFile(filename: string) {
        const destination = this.generateFilePath(filename)
        this.writeRandomContent(destination)
        return destination
    }

    private static writeRandomContent(destination: string) {
        diskUtil.writeFile(destination, generateId())
    }

    private static generateFilePath(filename: string) {
        return diskUtil.resolvePath(
            diskUtil.createRandomTempDir(),
            filename
        ) as string
    }
}
