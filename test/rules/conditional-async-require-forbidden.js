import test from 'ava';
import rule from '../../lib/rules/conditional-async-require-forbidden';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test("rule is defined", t => {
    t.truthy(rule);
});

ruleTester.run('conditional-async-require-forbidden', rule, {
    valid: [
        'require(["module-name"], function () {})',
        'require("module-name")'
    ],
    invalid: [
        {
            code: 'var module = "subapps/home/show/controller"; \nrequire([module], function () {\n});',
            errors: [{ message: 'Conditional asynchronous require is forbidden. Use require(["my-module-path"], callback); instead. docs/async.md' }]
        },
        {
            code: 'var module = condition ? "subapps/login/show/controller" : "subapps/logout/show/controller";\n require([module], function () {\n});',
            errors: [{ message: 'Conditional asynchronous require is forbidden. Use require(["my-module-path"], callback); instead. docs/async.md' }]
        }
    ]
});

