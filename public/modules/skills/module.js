define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";

 var module = angular.module('app.skills', ['ui.router']);

 module.config(function ($stateProvider) {

  $stateProvider
          .state('apps.skills', {
           url: '/skills',
           views: {
            "apps": {
             controller: 'SkillsCtrl as skillsCtrl',
             templateUrl: 'public/modules/skills/views/skillsView.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/services/SkillsService.js',
                  'public/modules/skills/controllers/SkillsCtrl.js'
                 ]
                })
               }]
             }
            }
           }})
          .state('skill', {
           url: '/skill/{skillId}',
           views: {
            "root": {
             controller: 'SkillCtrl as skillCtrl',
             templateUrl: 'public/modules/skills/views/skillView.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/services/SkillService.js',
                  'public/modules/skills/controllers/SkillCtrl.js'
                 ]
                })
               }]
             }
            }
           }})
 });
 return module;
});
