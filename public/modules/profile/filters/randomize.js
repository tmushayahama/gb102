
angular.module("app.profiles").filter('randomize', function () {
 return function (input, scope) {
  if (input != null && input != undefined && input > 1) {
   return Math.floor((Math.random() * input) + 1);
  }
 }
});