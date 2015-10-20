'use strict';
require([
 'angular',
 '../modules/skills/module'
], function (angular, module) {
 module.controller('SkillsCtrl', ['SkillsServices', '$state', '$http', '$rootScope',
  function (SkillsServices, $state, $http, $rootScope) {
   var vm = this;
   vm.theme = "public/css/ss_themes/ss_theme_1.css";
   vm.skills = [];
   var skillData = {
   };

   vm.getSkills = function () {
    SkillsServices.get(skillData).success(function (data) {
     vm.skills = data;
    }).error(function (data) {
     console.log(data);
    });
   };

   vm.getSkills();
  }
 ]);
});