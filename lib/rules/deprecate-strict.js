"use strict";

var _ = require("underscore");

module.exports = {
    meta: {
        docs: {},
        fixable: "code"
    },
    create: function (context) {
        return {
            "Program": function (node) {
                var useStrictNode = _.find(node.body, function (statement) {
                    return statement.type === "ExpressionStatement" &&
                        statement.expression.type === "Literal" &&
                        statement.expression.value === "use strict";
                });

                if (!useStrictNode) return;

                context.report({
                    node: node,
                    message: "Deprecated `use strict` statement, remove it.",
                    fix: function (fixer) {
                        return fixer.remove(useStrictNode);
                    }
                });
            }
        };
    }

};
