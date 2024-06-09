# node-file-checker
Check whether file exists with optional timeout

## Installation

`npm install @neurodevs/node-file-checker`

## Static Creation Method

```typescript
const checker = FileCheckerImpl.Checker()
```

## Check If File Exists

```typescript
import { FileCheckerImpl } from '@neurodevs/node-file-checker'

const path = '...'
const checker = FileCheckerImpl.Checker()

// Needs to be in an async function
const wasFound = await checker.checkIfFileExists(path)
```

## Check with a Timeout (Default: No timeout)

```typescript
import { FileCheckerImpl } from '@neurodevs/node-file-checker'

const path = '...'
const timeoutMs = 1000

const checker = FileCheckerImpl.Checker({ timeoutMs })

// Needs to be in an async function
const wasFound = await checker.checkIfFileExists(path)
```


## Use a Test Double in Your Tests

```typescript
import { FileCheckerImpl, FakeFileChecker } from '@neurodevs/node-file-checker'

FileCheckerImpl.Class = FakeFileChecker
const fakeChecker = FileCheckerImpl.Checker()
```

## Create Your Own Test Double

```typescript
import { FileChecker } from '@neurodevs/node-file-checker'

class MockFileChecker implements FileChecker {
    ...
}

FileCheckerImpl.Class = MockFileChecker
const mockChecker = FileCheckerImpl.Checker()
```
