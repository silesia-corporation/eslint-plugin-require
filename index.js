'use strict';

module.exports = {
    rules: {
        'conditional-async-require-forbidden': require('./lib/rules/conditional-async-require-forbidden'),
        'deprecate-define': require('./lib/rules/deprecate-define'),
        'deprecate-sugar': require('./lib/rules/deprecate-sugar'),
        'deprecate-strict': require('./lib/rules/deprecate-strict'),
        'deprecate-globals': require('./lib/rules/deprecate-globals')
    },
    configs: {
        recommended: {
            rules: {
                '@silesia-corporation/requirejs/conditional-async-require-forbidden': 1
            }
        },
        deprecate: {
            rules: {
                '@silesia-corporation/requirejs/deprecate-define': 2,
                '@silesia-corporation/requirejs/deprecate-sugar': 2,
                '@silesia-corporation/requirejs/deprecate-strict': 2,
                '@silesia-corporation/requirejs/deprecate-globals': 2
            }
        }
    }
};
