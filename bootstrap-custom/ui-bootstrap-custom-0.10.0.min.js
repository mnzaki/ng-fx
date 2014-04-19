/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.10.0 - 2014-01-14
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.dropdownToggle"]),angular.module("ui.bootstrap.dropdownToggle",[]).directive("dropdownToggle",["$document","$location",function(a){var b=null,c=angular.noop;return{restrict:"CA",link:function(d,e){d.$watch("$location.path",function(){c()}),e.parent().bind("click",function(){c()}),e.bind("click",function(d){var f=e===b;d.preventDefault(),d.stopPropagation(),b&&c(),f||e.hasClass("disabled")||e.prop("disabled")||(e.parent().addClass("open"),b=e,c=function(d){d&&(d.preventDefault(),d.stopPropagation()),a.unbind("click",c),e.parent().removeClass("open"),c=angular.noop,b=null},a.bind("click",c))})}}}]);