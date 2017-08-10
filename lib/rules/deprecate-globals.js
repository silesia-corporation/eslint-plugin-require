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
                var comments = node.comments,
                    unnecessary = ["define", "require"],
                    firstComment = comments && comments[0],
                    firstCommentValue = (firstComment && firstComment.value.trim()) || "",
                    isFirstCommentGlobals = firstCommentValue.indexOf("globals") === 0,
                    before = firstCommentValue.replace("globals ", "").split(", "),
                    after = before.filter(function (variable) { return unnecessary.indexOf(variable) < 0; });

                if (before.length === after.length) return true;

                context.report({
                    node: comments && comments[0],
                    message: "Deprecated variables `require` and `define` in globals, remove them.",
                    fix: function (fixer) {
                        var newGlobals = after.length > 0 && "/*globals " + after.join(", ") + "*/\r\n\r\n",
                            globalsRange = [firstComment.start, firstComment.end];

                        if (newGlobals) return fixer.replaceTextRange(globalsRange, newGlobals);
                        else return fixer.removeRange(globalsRange);
                    }
                });
            }
        };
    }

};
