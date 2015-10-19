(function () {

 'use strict';
 angular
         .module('gbApp')
         .controller('SkillsCtrl', ['Skills', '$state', '$http', '$rootScope',
          function (Skills, $state, $http, $rootScope) {
           var vm = this;
           vm.theme = "public/css/ss_themes/ss_theme_1.css";
           vm.skills = [];
           var skillData = {
           };

           vm.getSkills = function () {
            Skills.get(skillData).success(function (data) {
             vm.skills = data;
            }).error(function (data) {
             console.log(data);
            });
           };

           vm.getSkills();
          }
         ])
})();