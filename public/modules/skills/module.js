'use strict';
define([
 'angular',
 '../skills/controllers/SkillsCtrl',
 '../skills/services/SkillsService',
 '../skills/services/SkillService'
], function (angular) {
 return angular.module('app.skills',
         [
         ])
         .config(function ($stateProvider) {
          $stateProvider
                  .state('app.skills', {
                   url: '/skills',
                   templateUrl: 'public/views/skill/skillsView.html',
                   controller: 'SkillsCtrl as skillsCtrl'
                  });
         });
});
