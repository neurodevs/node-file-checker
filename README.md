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
const wasFound = checker.checkIfFileExists(path)
```

## Check with a Timeout (Default: No timeout)

```typescript
import { FileCheckerImpl } from '@neurodevs/node-file-checker'

const path = '...'
const timeoutMs = 1000

const checker = FileCheckerImpl.Checker()

// Need to be in async function
const wasFound = await checker.checkIfFileExists(path, timeoutMs)
```


## Use a Test Double in Your Tests

```typescript
import { FileCheckerImpl, FakeFileChecker } from '@neurodevs/node-file-checker'

FileCheckerImpl.Class = FakeFileChecker
const fakeChecker = FileCheckerImpl.Checker()
```