import test from 'ava';
import rule from '../../lib/rules/deprecate-globals';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test("rule is defined", t => {
    t.truthy(rule);
});

ruleTester.run('deprecate-globals', rule, {
    valid: [
        '/*globals foo*/',
        '/*another comment globals*/',
        '/*another comment*//*globals foo*/',
        'function foo () {}'
    ],
    invalid: [
        {
            code: '/*globals define*/',
            output: '',
            errors: [{ message: 'Deprecated variables `require` and `define` in globals, remove them.' }]
        },
        {
            code: '/*globals require*/function foo () {}',
            output: 'function foo () {}',
            errors: [{ message: 'Deprecated variables `require` and `define` in globals, remove them.' }]
        },
        {
            code: '/*globals define, require*//*another comment*/function foo () {}',
            output: '/*another comment*/function foo () {}',
            errors: [{ message: 'Deprecated variables `require` and `define` in globals, remove them.' }]
        },
        {
            code: '/*globals define, require, foo*/function foo () {}',
            output:
                '/*globals foo*/\r\n' + 
                '\r\n' + 
                'function foo () {}',
            errors: [{ message: 'Deprecated variables `require` and `define` in globals, remove them.' }]
        }
    ]
});

