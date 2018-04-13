[![Build Status](https://travis-ci.org/UUDigitalHumanitieslab/ts-xpath.svg?branch=develop)](https://travis-ci.org/UUDigitalHumanitieslab/ts-xpath)

# ts-xpath
This is a modified version of [js-xpath](https://github.com/dimagi/js-xpath). It is adapted for use with TypeScript and is compiled using `npm run build`.

## Usage

```
npm install ts-xpath
```

```typescript
import { XPathParser } from 'ts-xpath';

let parser = new XPathParser();
let parsed = parser.parse("//node");
```
