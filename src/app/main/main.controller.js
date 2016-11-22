(function ()
{
 'use strict';

 angular
         .module('fuse')
         .controller('MainController', MainController);

 /** @ngInject */
 function MainController($scope, $rootScope)
 {
  // Data

  //////////

  // Remove the splash screen
  $scope.$on('$viewContentAnimationEnded', function (event)
  {
   if (event.targetScope.$id === $scope.$id)
   {
    $rootScope.$broadcast('msSplashScreen::remove');
   }
  });

  function scrollArrowShow() {
   var maxScroll = ($('#inner-wrap').width() - $('#slide-wrap').scrollLeft()) - $('#slide-wrap').width();
   if (0 == $('#slide-wrap').scrollLeft()) {
    $('#scroll_L_Arrow').css({visibility: 'hidden'});
   } else {
    $('#scroll_L_Arrow').css({visibility: 'visible'});
   }
   if (0 == maxScroll) {
    $('#scroll_R_Arrow').css({visibility: 'hidden'});
   } else {
    $('#scroll_R_Arrow').css({visibility: 'visible'});
   }
  }

  function scrollThumb(direction) {
   if (direction == 'Go_L') {
    $('#slide-wrap').animate({
     scrollLeft: "-=" + 250 + "px"
    }, function () {
     scrollArrowShow();
    });
   } else
   if (direction == 'Go_R') {
    $('#slide-wrap').animate({
     scrollLeft: "+=" + 250 + "px"
    }, function () {
     // createCookie('scrollPos', $('#slide-wrap').scrollLeft());
     scrollArrowShow();
    });
   }
  }


  function moveBy(scrollId, delta) {

   var selector = scrollId;
   var $scrollable = $(selector);//.find('.gb-horizontal-scrollable');
   var curScroll = $scrollable.scrollLeft();
   var scrollTo = curScroll + delta;
   /*
    scrollTo = (delta > 0)
    ? Math.min(scrollTo, $(window).width())
    : Math.max(scrollTo, 0);
    */

   $scrollable.animate({
    scrollLeft: +scrollTo + "px"
   }, function () {
    scrollArrowShow();
   });

   //scrollLeft(scrollTo);

  }

  $rootScope.scrollHorizontal = function (sectionId, delta) {
   moveBy(sectionId, delta);
  };

 }
})();