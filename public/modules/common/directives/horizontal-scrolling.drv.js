var horizontalScrolling = function ($window) {
 function moveBy(sectionIndex, sectionID, delta) {

  sectionIndex = (typeof sectionIndex === 'undefined')
          ? ''
          : sectionIndex;

  var selector = '#' + sectionID + sectionIndex,
          $scrollable = $(selector).find('.scrollable'),
          curScroll = $scrollable.scrollLeft(),
          scrollTo = curScroll + delta;

  scrollTo = (delta > 0)
          ? Math.min(scrollTo, $(window).width())
          : Math.max(scrollTo, 0);

  $scrollable.scrollLeft(scrollTo);

 }
 return {
  restrict: 'AE',
  replace: 'true',
  template: '<div class="scroll-btns">' +
          '<div class="scroll-left icon-arrow-left" ng-click="scrollLeft(sectionIndex, sectionID)">' +
          '<img src="http://icons.iconseeker.com/png/fullsize/fresh-addon/arrow-left-1.png" height="28px" alt="" />' +
          '</div>' +
          '<div class="scroll-right icon-arrow-right" ng-click="scrollRight(sectionIndex, sectionID)">' +
          '<img src="http://www.veryicon.com/icon/png/System/Fresh%20Addon/Arrow%20right.png" height="28px" alt="" />' +
          '</div>' +
          '</div>',
  link: function (scope, elem, attrs) {
   scope.scrollLeft = function (sectionIndex, sectionID) {
    moveBy(sectionIndex, sectionID, -100);
   };
   scope.scrollRight = function (sectionIndex, sectionID) {
    moveBy(sectionIndex, sectionID, +100);
   };
  }
 };

};

angular.module('app').directive('horizontalScrolling', horizontalScrolling);