"use strict";

const doc = "docs/async.md",
    message = `Conditional asynchronous require is forbidden. Use require(["my-module-path"], callback); instead. ${doc}`;

module.exports = function (context) {

    return {
        "CallExpression": function (node) {

            if (node.callee.name === "require" &&
                node.arguments.length === 2 &&
                node.arguments[0].type === "ArrayExpression" &&
                node.arguments[0].elements[0].type !== "Literal") {
                context.report({
                    node: node,
                    message: message
                });
            }
        }
    };

};

module.exports.schema = [];
