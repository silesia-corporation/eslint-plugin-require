import test from 'ava';
import rule from '../../lib/rules/deprecate-define';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test("rule is defined", t => {
    t.truthy(rule);
});

ruleTester.run('deprecate-define', rule, {
    valid: [
        'function foo() {}',
        'function foo() {var bar = require("bar");}',
        'function foo() {require("bar", function () {});}',
    ],
    invalid: [
        // define without dependencies in array
        {
            code: 'define(function () {})',
            output: '',
            errors: [{ message: 'Deprecated require.js `define` statement. Use `export` and `import` instead.' }]
        },
        {
            code: 'define(function () {var bar = require("bar");})',
            output: 'var bar = require("bar");',
            errors: [{ message: 'Deprecated require.js `define` statement. Use `export` and `import` instead.' }]
        },
        {
            code: 'define(function () {return {foo: "foo"}})',
            output: 'export default {foo: "foo"}',
            errors: [{ message: 'Deprecated require.js `define` statement. Use `export` and `import` instead.' }]
        },
        {
            code: 'define(function () {var bar = require("bar");return {foo: "foo"}})',
            output: 'var bar = require("bar");export default {foo: "foo"}',
            errors: [{ message: 'Deprecated require.js `define` statement. Use `export` and `import` instead.' }]
        },

        // define with dependencies in array
        {
            code: 'define([], function () {})',
            output: '',
            errors: [{ message: 'Deprecated require.js `define` statement. Use `export` and `import` instead.' }]
        },
        {
            code: 'define([], function () {return {foo: "foo"}})',
            output: 'export default {foo: "foo"}',
            errors: [{ message: 'Deprecated require.js `define` statement. Use `export` and `import` instead.' }]
        },
        {
            code: 'define(["bar"], function () {})',
            output:
                'import "bar";\r\n' + 
                '\r\n',
            errors: [{ message: 'Deprecated require.js `define` statement. Use `export` and `import` instead.' }]
        },
        {
            code: 'define(["baz"], function (baz) {})',
            output:
                'import baz from "baz";\r\n' + 
                '\r\n',
            errors: [{ message: 'Deprecated require.js `define` statement. Use `export` and `import` instead.' }]
        },
        {
            code: 'define(["baz", "bar"], function (baz) {return {foo: "foo"}})',
            output: 
                'import baz from "baz";\r\n' + 
                'import "bar";\r\n' + 
                '\r\n' +
                'export default {foo: "foo"}',
            errors: [{ message: 'Deprecated require.js `define` statement. Use `export` and `import` instead.' }]
        },

        // define with object
        {
            code: 'define({foo: "foo"})',
            output: 'export default {foo: "foo"}',
            errors: [{ message: 'Deprecated require.js `define` statement. Use `export` and `import` instead.' }]
        }
    ]
});

