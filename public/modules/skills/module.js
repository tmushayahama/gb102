'use strict';
define([
 'angular',
 'controllers/SkillsCtrl',
 'services/SkillService',
 'services/SkillsService'
], function (angular) {
 angular.module('app.skills')
         .config(function ($stateProvider) {
          $stateProvider
                  .state('app.skills', {
                   url: '/skills',
                   templateUrl: 'public/views/skill/skillsView.html',
                   controller: 'SkillsCtrl as skillsCtrl'
                  });
         });
});
