angular.module("app.skills").controller('SkillCtrl', ['SkillService', '$state', '$http', '$rootScope',
 function (SkillService, $state, $http, $rootScope) {
  var vm = this;
  vm.theme = "public/css/ss_themes/ss_theme_1.css";
  vm.skills = [];
  var skillData = {
  };

  vm.getSkill = function (id) {
   SkillService.get(skillData).success(function (data) {
    vm.skills = data;
   }).error(function (data) {
    console.log(data);
   });
  };

  //vm.getSkill();
 }
])