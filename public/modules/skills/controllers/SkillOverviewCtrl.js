angular.module("app.skills").controller('SkillOverviewCtrl', ['SkillService', '$state', '$stateParams', '$http', '$rootScope',
 function (SkillService, $state, $stateParams, $http, $rootScope) {
  var vm = this;
  vm.skills = [];
  var skillData = {
  };

  vm.getSkill = function (id, data) {
   SkillService.get(id, data).success(function (response) {
    vm.skill = response;
   }).error(function (response) {
    console.log(response);
   });
  };

  vm.getSkill($stateParams.skillId, skillData);
 }
])