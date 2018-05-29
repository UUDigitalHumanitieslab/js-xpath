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

`xpath-models.ts` provides a default `XPathModels` which does not support the hashtag preprocessor. If you want to support hashtags within xpaths, you can use:
```typescript
let hashtagConfig: XPathModels.HashtagConfig = {
  isValidNamespace: (namespace: string) => boolean,
  hashtagToXPath: (hashtagExpr: string) => string | null,
  toHashtag: (xpath: IXPathExpression) => string | null
}
parser.hashtagConfig = hashtagConfig;
```

hashtags use the format `#namespace/arbitrarily/long/path` and do not support filtering

## Tests
- Run `npm run test` to run tests.

## Known Limitations
- Filter expressions are not supported due to a known bug in jison.
- See the failing tests for examples of expressions that are known not to work.
  
## Build
This is built using [jison](http://zaach.github.com/jison/). To build the parser file yourself run:

`$ npm run build` - This will build both the distribution (`webpack`) package in dist/ and rebuild the Jison parser (`src/jison/xpath.js`) from the `src/jison/` files. 
`$ npm run jison` - Rebuild `parser.js` from the Jison specification files.
`$ npm run dist` - Rebuild the browser friendly distribution from the current source files.

For more information on jison see the jison project website at: http://zaach.github.com/jison/.
