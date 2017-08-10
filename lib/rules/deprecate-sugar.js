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
                var allVars = _.findWhere(node.body, {type: "VariableDeclaration"}) || {},
                    requireVars = [],
                    nonRequireVars = [],
                    requireStatements = _.filter(node.body, function (statement) {
                        return statement.type === "ExpressionStatement" &&
                            statement.expression &&
                            statement.expression.callee &&
                            statement.expression.callee.name === "require";
                    }) || [];

                if (!allVars && !requireStatements) return true;

                _.each(allVars.declarations, function (variable) {
                    var isRequire = variable.init &&
						variable.init.type === "CallExpression" &&
                        variable.init.callee &&
                        variable.init.callee.name === "require";
                    if (isRequire) requireVars.push(variable);
                    else nonRequireVars.push(context.getSourceCode().getText(variable));
                });

                if (requireVars.length === 0 && requireStatements.length === 0) return true;
                
                context.report({
                    node: node,
                    message: "Deprecated require sugar syntax, use import instead.",
                    fix: function (fixer) {
                        var head = "",
                            fixers = [];

                        _.each(requireVars, function (requireDeclaration) {
                            var name = requireDeclaration.id.name,
                                value = requireDeclaration.init.arguments[0].value;

                            head += "import " + name + " from \"" + value + "\";\r\n";
                        });

                        _.each(requireStatements, function (requireStatement) {
                            var value = requireStatement.expression.arguments[0].value;
                            head += "import \"" + value + "\";\r\n";
                        });

                        if (nonRequireVars.length > 0)
                            head += "\r\nvar " + nonRequireVars.join(",\r\n") + ";";

                        fixers.push(fixer.insertTextAfterRange([0, 0], head));
                        if (!_.isEmpty(allVars)) fixers.push(fixer.remove(allVars));
                        _.each(requireStatements, function (requireStatement) {
                            fixers.push(fixer.remove(requireStatement));
                        });

                        return fixers;
                    }
                });
            }
        };
    }

};
