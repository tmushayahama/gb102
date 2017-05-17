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


  $scope.upperIndex = [350, 330, 310, 290, 270, 250, 230, 210, 190, 170, 150, 130, 110, 90, 70, 50, 30, 10, 350, 330, 310, 290, 270, 250, 170, 150, 130, 110, 90, 70, 50, 30, 10];
  $scope.lowerIndex = [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3];

  $scope.images = [
   "https://c1.staticflickr.com/1/591/22665222766_07524ca21a_k.jpg",
   "https://farm4.staticflickr.com/3746/9503927685_970b5e141b_k_d.jpg",
   "https://farm1.staticflickr.com/661/21230969582_33e91e2a9a_o_d.jpg",
   "https://c2.staticflickr.com/8/7426/12233323463_57606d8e87_k.jpg",
   "https://farm1.staticflickr.com/648/20938457876_4d0924e380_o_d.jpg",
   "https://c1.staticflickr.com/9/8820/16523586334_4d22f1754b_k.jpg",
   "https://farm6.staticflickr.com/5688/21597873406_d19b851a96_o_d.jpg",
   "https://farm4.staticflickr.com/3876/14634078309_f77e77d6b9_o_d.jpg",
   "https://farm4.staticflickr.com/3860/14632678619_eb4f89ef85_o_d.jpg",
   "https://farm4.staticflickr.com/3844/14626558247_6aaa566397_o_d.jpg",
   "https://farm8.staticflickr.com/7425/14182933691_af44ff2a43_o_d.jpg",
   "https://farm4.staticflickr.com/3877/14847119920_7e5e9398e9_o_d.jpg",
   "https://farm9.staticflickr.com/8526/8546879452_2e097547a6_o_d.jpg",
   "https://farm6.staticflickr.com/5578/14847291760_a1945131e6_o_d.jpg",
   "https://farm6.staticflickr.com/5595/15030728651_753a31e3ca_o_d.jpg",
   "https://farm4.staticflickr.com/3869/14460157987_e0892869e2_o_d.jpg",
   "https://farm4.staticflickr.com/3947/15426357418_9976b269b0_o_d.jpg",
   "https://farm6.staticflickr.com/5817/21608154473_74bd18c61f_o_d.jpg",
   "https://farm6.staticflickr.com/5324/16622294523_67e373a118_o_d.jpg",
   "https://farm4.staticflickr.com/3734/11368642323_b4be377644_o_d.jpg",
   "https://farm4.staticflickr.com/3912/15030746921_c030b23b2b_o_d.jpg",
   "https://farm4.staticflickr.com/3899/14847155059_33ccd392b5_o_d.jpg",
   "https://c1.staticflickr.com/1547/24151972210_081aeaf891_o_d.jpg",
   "https://c1.staticflickr.com/1585/24339263532_4ddae26189_o_d.jpg",
   "https://c1.staticflickr.com/1524/24365150991_39fc7c5b35_o_d.jpg",
   "https://c1.staticflickr.com/1659/24079886189_8a475ff9cd_o_d.jpg",
   "https://farm4.staticflickr.com/3689/13202443445_00c76d4caa_o_d.jpg",
   "https://farm4.staticflickr.com/3679/11829226443_ef2a8482d1_o_d.jpg",
   "https://farm3.staticflickr.com/2939/14486898640_a42a82869b_o_d.jpg",
   "https://farm8.staticflickr.com/7476/15805694576_e56e29784e_o_d.jpg",
   "https://farm3.staticflickr.com/2817/9174896564_88ec346440_o_d.jpg",
   "https://farm8.staticflickr.com/7476/15805694576_e56e29784e_o_d.jpg",
   "https://farm3.staticflickr.com/2817/9174896564_88ec346440_o_d.jpg"
  ];

  $scope.getThumbnail = function (url)
  {
   if (url)
   {
    var index = url.lastIndexOf("/") + 1;
    var filename = url.substr(index);
    return 'src/assets/images/flickr/' + filename;
   }
   return "";
  }

  $scope.viewImage = function (imageURL) {
   window.location.assign('#/image?url=' + imageURL);
  }

  var scene = document.querySelector('a-scene');
  if (scene) {
   if (scene.hasLoaded) {
    scene.enterVR();
   } else {
    scene.addEventListener('loaded', scene.enterVR);
   }
  }

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
    vm.displayComponents = shuffleSampleGroups();
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