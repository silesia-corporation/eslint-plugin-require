import test from 'ava';
import rule from '../../lib/rules/deprecate-sugar';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test("rule is defined", t => {
    t.truthy(rule);
});

ruleTester.run('deprecate-sugar', rule, {
    valid: [
        'function foo () { var bar = require("bar"); }'
    ],
    invalid: [
        {
            code: 'var foo = require("foo");',
            output: 'import foo from "foo";\r\n',
            errors: [{ message: 'Deprecated require sugar syntax, use import instead.' }]
        },
        {
            code: 'require("bar");',
            output: 'import "bar";\r\n',
            errors: [{ message: 'Deprecated require sugar syntax, use import instead.' }]
        },
        {
            code: 'var foo = require("foo"), baz = {};require("bar");',
            output:
                'import foo from "foo";\r\n' + 
                'import "bar";\r\n' +
                '\r\n' +
                'var baz = {};',
            errors: [{ message: 'Deprecated require sugar syntax, use import instead.' }]
        },
    ]
});

