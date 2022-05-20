import {LinterMeta} from '@swagger-api/apidom-ls';

export function rules(): LinterMeta[] {
return [
    {
        name: 'SB-API-050-property-names',
        description: 'property names must be camelCase and alphanumeric',
        recommended: true,
        given: ['schema'],
        code: 20001,
        source: 'apilint',
        message: 'properties MUST follow camelCase',
        severity: 1,
        linterFunction: 'apilintKeyCasing',
        linterParams: ['camel'],
        marker: 'key',
        conditions: [
            {
                targets: [{ path: 'parent' }],
                function: 'apilintElementOrClass',
                params: [['json-schema-properties']],
            },
        ],
        data: {},
    },
    {
        name: 'SB-API-050-query-parameter-names',
        description: 'query parameter names must be camelCase',
        recommended: true,
        given: ['parameter'],
        code: 20002,
        source: 'apilint',
        message: 'parameter names MUST follow camelCase',
        severity: 1,
        linterFunction: 'apilintValueCasing',
        linterParams: ['camel'],
        target: 'name',
        markerTarget: 'name',
        marker: 'key',
        conditions: [
            {
                targets: [{ path: 'in' }],
                function: 'apilintValueOrArray',
                params: [['query']],
            },
        ],
        data: {},
    },
    {
        name: 'SB-API-051-path-segments',
        description: 'path segments must be kebab-case',
        recommended: true,
        given: ['pathItem'],
        code: 20003,
        source: 'apilint',
        message: 'path segments MUST follow kebab-case (lower case and separated with hyphens).',
        severity: 1,
        linterFunction: 'apilintKeyRegex',
        linterParams: ['^(/|[a-z0-9-.]+|{[a-zA-Z0-9_]+})+$'],
        marker: 'key',
        conditions: [
            {
                targets: [{ path: 'parent' }],
                function: 'apilintElementOrClass',
                params: [['paths']],
            },
        ],
        data: {},
    }
];

}
