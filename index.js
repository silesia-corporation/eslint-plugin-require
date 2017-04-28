'use strict';

module.exports = {
    rules: {
        'conditional-async-require-forbidden': require('./lib/rules/conditional-async-require-forbidden')
    },
    configs: {
        recommended: {
            rules: {
                'requirejs/conditional-async-require-forbidden': 1
            }
        }
    }
};
