import test from 'ava';
import rule from '../../lib/rules/deprecate-strict';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test("rule is defined", t => {
    t.truthy(rule);
});

ruleTester.run('deprecate-strict', rule, {
    valid: [
        'function foo () {}'
    ],
    invalid: [
        {
            code: '\'use strict\';function foo () {}',
            output: 'function foo () {}',
            errors: [{ message: 'Deprecated `use strict` statement, remove it.' }]
        }
    ]
});

