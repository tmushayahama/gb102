angular.module("app.mentorships").directive("todoFocus",["$timeout",function(a){return function(b,c,d){b.$watch(d.todoFocus,function(b){b&&a(function(){c[0].focus()},0,!1)})}}]);