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
                  'public/modules/skills/controllers/SkillsCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('skill', {
           abstract: true,
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
                  'public/modules/skills/controllers/SkillCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('skill.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'SkillOverviewCtrl as skillOverviewCtrl',
             templateUrl: 'public/modules/skills/views/skillOverviewView.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/services/SkillService.js',
                  'public/modules/skills/controllers/SkillOverviewCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('skill.todos', {
           url: '/todos',
           views: {
            "content": {
             controller: 'SkillTodosCtrl as skillTodosCtrl',
             templateUrl: 'public/modules/skills/views/skillTodosView.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/directives/todoEscape.js',
                  'public/modules/skills/directives/todoFocus.js',
                  'public/modules/skills/services/SkillTodosService.js',
                  'public/modules/skills/controllers/SkillTodosCtrl.js',
                          // 'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
 });
 return module;
});
