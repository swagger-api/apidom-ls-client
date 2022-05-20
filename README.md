# apidom-ls-client

Demo client for apidom-ls OpenAPI / AsyncAPI ApiDOM validation service

## Usage

```
npm install
npm run process
```

### Providing rules

Add rules to array returned from file src/rules.ts

Field `given` expects an array of string representing the `element` items to apply the rules to (e.g. `schema`, `operation`)
(TBD: jsonpath on the way)

`element` is a string semantically identifying a node in the document, available elements can be found by:

1. look at [this elements list](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ns-openapi-3-1/src/elements) and pick
the `this.element` value within the file.
2. additional `element` values with [this query](https://cs.github.com/swagger-api/apidom?q=%22classes.push%22+path%3Apackages%2Fapidom-ns-openapi-3-1%2Fsrc%2Frefractor%2Fvisitors)

Several example of rules [here](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ls/src/config/asyncapi)

Core functions available in rules are available [here](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ls/src/services/validation/linter-functions.ts#L118=)
TBD: core functions will be exported by apidom-ls e.g. to be usable/extended within custom functions.

run `npm run process` to execute with the added/updated rules

#### Providing functions

Custom functions can be provided either "natively" by adding them to the object returned by src/functions.ts 
or as evaluated functions by adding a `<functionName>.js` file to `functions` directory  