(function ()
{
 'use strict';

 angular
         .module('app.welcome')
         .controller('WelcomeController', WelcomeController);

 /** @ngInject */
 function WelcomeController($scope)
 {
  var vm = this;

  // Data
  //vm.dashboardData = DashboardData;


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
   },
  ];

 }
})();