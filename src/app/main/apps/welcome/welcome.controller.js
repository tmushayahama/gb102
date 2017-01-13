(function ()
{
 'use strict';

 angular
         .module('app.welcome')
         .controller('WelcomeController', WelcomeController);

 /** @ngInject */
 function WelcomeController(WelcomeService, $scope, $rootScope)
 {
  var vm = this;

  // Data
  //vm.dashboardData = DashboardData;
  vm.components = [];

  vm.myInterval = 5000;
  vm.noWrapSlides = false;
  vm.active = 0;
  vm.slides = [
   {
    image: 'src/assets/images/landing-page/background-surfing.png',
    text: "surfing",
    id: 0
   },
   {
    image: 'src/assets/images/landing-page/background-grilling.png',
    text: "grilling",
    id: 1
   },
   {
    image: 'src/assets/images/landing-page/background-chess.png',
    text: "chess",
    id: 2
   },
   {
    image: 'src/assets/images/landing-page/background-piano.png',
    text: "piano",
    id: 3
   },
   {
    image: 'src/assets/images/landing-page/background-soccer.png',
    text: "soccer",
    id: 4
   }
  ];

  init();

  // Returns a random number between min (inclusive) and max (exclusive)
  function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
  }

  function shuffleSampleGroups() {
   var result = [];
   var group = [];
   var count = 0;
   var n = getRandom(1, 4);

   angular.forEach(vm.components.samples, function (sample) {
    group.push(sample.component);
    count++;
    if (count === n) {
     result.push(group);
     group = [];
     n = getRandom(1, 5);
     count = 0;
    }
   });
   return result;
  }

  function init() {
   WelcomeService.getComponents(5).then(function (data) {
    vm.components = data;
    // vm.displayComponents = shuffleSampleGroups();
    angular.forEach(vm.components.recommendations, function (recommendation) {
     angular.forEach(recommendation.recommendationComponents, function (recommendationComponent) {
      if (recommendationComponent.component.component_picture_url || recommendationComponent.component.component_picture_url === 'default.png') {
       recommendationComponent.component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
      }
     });
    });
   });
  }
 }
})();