angular.module("app.profiles").directive("todoFocus",["$timeout",function($timeout){return function(scope,elem,attrs){scope.$watch(attrs.todoFocus,function(newval){newval&&$timeout(function(){elem[0].focus()},0,!1)})}}]);