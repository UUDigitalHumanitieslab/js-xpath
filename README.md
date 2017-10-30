# ts-xpath
This is a modified version of [js-xpath](https://github.com/dimagi/js-xpath). It is adapted for use with TypeScript and is compiled using `npm run build`.

## Usage

```typescript
import XPathParser from 'ts-xpath';

let parser = new XPathParser();
let parsed = parser.parse("//node");
```
