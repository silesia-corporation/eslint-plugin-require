"use strict";

var _ = require("underscore");

module.exports = {
    meta: {
        docs: {},
        fixable: "code"
    },
    create: function (context) {
        return {
            "CallExpression": function (node) {
                var hasDefine = node.callee.name === "define",
                    hasDefineWithFunction =
                        hasDefine &&
                        node.arguments.length === 1 &&
                        node.arguments[0].type === "FunctionExpression",
                    hasDefineWithArrayDependencies = 
                        hasDefine &&
                        node.arguments.length === 2 &&
                        node.arguments[1].type === "FunctionExpression",
                    hasDefineWithObject = 
                        hasDefine &&
                        node.arguments.length === 1 &&
                        node.arguments[0].type === "ObjectExpression",
                    source,
                    fix;

                if (!hasDefine) return true;

                if (hasDefineWithFunction) {
                    fix = function (fixer) {
                        var source = context.getSourceCode().getText(node.arguments[0].body),
                            returnStatement = _.findWhere(node.arguments[0].body.body, {type: "ReturnStatement"}),
                            returnStatementSource,
                            exportDefaultStatementSource;

                        if (returnStatement) {
                            returnStatementSource = context.getSourceCode().getText(returnStatement),
                            exportDefaultStatementSource = returnStatementSource.replace("return", "export default");
                            source = source.replace(returnStatementSource, exportDefaultStatementSource);
                        }

                        return fixer.replaceText(node, source.slice(1, -1));
                    }
                }

                if (hasDefineWithArrayDependencies) {
                    fix = function (fixer) {
                        var source = context.getSourceCode().getText(node.arguments[1].body),
                            params = node.arguments[1].params,
                            dependencies = node.arguments[0].elements,
                            head = "",
                            returnStatement = _.findWhere(node.arguments[1].body.body, {type: "ReturnStatement"}),
                            returnStatementSource,
                            exportDefaultStatementSource;

                        if (returnStatement) {
                            returnStatementSource = context.getSourceCode().getText(returnStatement),
                            exportDefaultStatementSource = returnStatementSource.replace("return", "export default");
                            source = source.replace(returnStatementSource, exportDefaultStatementSource);
                        }

                        if (!_.isEmpty(dependencies)) {
                            _.each(dependencies, function (dependency, idx) {
                                if (params[idx]) head += "import " + params[idx].name + " from \"" + dependency.value +"\";\r\n"
                                else head += "import \"" + dependency.value + "\";\r\n";
                            });
                            head += "\r\n"
                        }

                        return fixer.replaceText(node, head + source.slice(1, -1));
                    }
                }

                if (hasDefineWithObject) {
                    fix = function (fixer) {
                        var source = context.getSourceCode().getText(node.arguments[0]);
                        return fixer.replaceText(node, "export default " + source);
                    }
                }

                context.report({
                    node: node,
                    message: "Deprecated require.js `define` statement. Use `export` and `import` instead.",
                    fix: fix
                });
            }
        };
    }

};
