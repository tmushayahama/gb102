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
  vm.boardList = [];

  vm.myInterval = 5000;
  vm.noWrapSlides = false;
  vm.active = 0;
  vm.slides = [
   {
    image: 'public/img/landing-page/background-surfing.png',
    text: "surfing",
    id: 0
   },
   {
    image: 'public/img/landing-page/background-grilling.png',
    text: "grilling",
    id: 1
   },
   {
    image: 'public/img/landing-page/background-chess.png',
    text: "chess",
    id: 2
   },
   {
    image: 'public/img/landing-page/background-piano.png',
    text: "piano",
    id: 3
   },
   {
    image: 'public/img/landing-page/background-soccer.png',
    text: "soccer",
    id: 4
   }
  ];

  init();



  function init() {
   WelcomeService.getBoards().then(function (data) {
    vm.boardList = data;
    angular.forEach(vm.boardList.apps, function (app, key) {
     angular.forEach(app.components, function (component, key) {
      if (component.component_picture_url || component.component_picture_url === 'default.png') {
       component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
      }
     });
    });
    angular.forEach(vm.boardList.activities, function (app, key) {
     angular.forEach(app.components, function (component, key) {
      if (component.component_picture_url || component.component_picture_url === 'default.png') {
       component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
      }
     });
    });
   });
  }

 }
})();