
angular.module("app.explore").filter('randomize', function () {
 return function (input, scope) {
  if (input != null && input != undefined && input > 1) {
   return Math.floor((Math.random() * input) + 1);
  }
 }
});