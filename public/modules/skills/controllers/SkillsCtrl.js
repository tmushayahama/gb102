angular.module("app.skills").controller('SkillsCtrl', ['SkillsService', '$state', '$http', '$rootScope',
 function (SkillsService, $state, $http, $rootScope) {
  var vm = this;
  //vm.theme = "public/css/ss_themes/ss_theme_1.css";
  vm.skills = [];
  var skillData = {
  };

  vm.getSkills = function () {
   SkillsService.get(skillData).success(function (response) {
    vm.skills = response;
   }).error(function (response) {
    console.log(response);
   });
  };

  vm.getSkills();
 }
])