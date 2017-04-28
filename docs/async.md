Asynchronous require
====================

Recommendation
--------------

It is recommended to use require with string literals, e.g.

// Good
require(["subapps/home/show/controller"], function () {
    
});

// Bad
var module = "subapps/home/show/controller";
require([module], function () {
    
});

// Bad
var module = condition ? "subapps/login/show/controller" : "subapps/logout/show/controller";
require([module], function () {
    
});

Reason
------

We are using a script that creates bundles automatically based on static code analysis and 
more complex definitions are not supported (dynamic loading cannot be determined during the 
analysis, string concatenation might occur and it's tricky to handle etc.).