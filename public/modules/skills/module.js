/*global require*/
'use strict';

define([
 'angular',
 'angular-ui-router',
 'angular-resource',
 'satellizer',
 'bootstrap',
], function (angular) {
 require([
  '../modules/skills/controllers/SkillsCtrl',
  '../modules/skills/services/SkillsService',
  '../modules/skills/services/SkillService'
 ], function (skillsCtrl, skillsService, skillService) {
  angular.module('app.skills',
          ['ui.router',
           'satellizer',
           'ngResource',
          ])
          // .controller('SkillsCtrl', skillsCtrl)
          .factory('SkillsService', skillsService)
          .factory('SkillService', skillService)

          .config(function ($stateProvider) {
           $stateProvider
                   .state('app', {
                    url: '/skills',
                    templateUrl: 'public/modules/skills/views/skillsView.html',
                    controller: 'SkillsCtrl as skillsCtrl'
                   });
          });
 });
})
