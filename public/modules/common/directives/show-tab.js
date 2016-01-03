var showTab = function () {
 return {
  link: function (scope, element, attrs) {
   element.click(function (e) {
    e.preventDefault();
    $(element).tab('show');
   });
  }
 };
};

angular.module('app').directive('showtab', showTab);